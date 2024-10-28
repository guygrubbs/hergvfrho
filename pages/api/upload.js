// pages/api/upload.js
import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Configure formidable options
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Google Drive API client
const initializeGoogleDrive = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
};

// Create folder structure in Google Drive
async function createFolderStructure(drive, companyName) {
  try {
    // Create main company folder
    const companyFolder = await drive.files.create({
      requestBody: {
        name: companyName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.UPLOAD_FOLDER_ID],
      },
      fields: 'id',
    });

    // Create subfolders
    const subfolders = ['Pitch_Deck', 'Financials', 'Analysis'];
    const folderStructure = {};
    
    for (const subfolder of subfolders) {
      const folder = await drive.files.create({
        requestBody: {
          name: subfolder,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [companyFolder.data.id],
        },
        fields: 'id',
      });
      folderStructure[subfolder] = folder.data.id;
    }

    return {
      companyFolderId: companyFolder.data.id,
      ...folderStructure,
    };
  } catch (error) {
    console.error('Error creating folder structure:', error);
    throw new Error('Failed to create folder structure in Google Drive');
  }
}

// Upload file to Google Drive
async function uploadFile(drive, filePath, fileName, folderId, mimeType) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType,
        body: fs.createReadStream(filePath),
      },
    });
    return response.data.id;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file to Google Drive');
  }
}

// Save submission data to database or storage
async function saveSubmissionData(data, fileIds) {
  // Implement your database storage logic here
  // This is a placeholder for where you'd save the form data and file references
  return {
    submissionId: Date.now().toString(),
    ...data,
    ...fileIds,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize form parser
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'tmp'),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    // Parse form data
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Initialize Google Drive
    const drive = initializeGoogleDrive();

    // Create folder structure
    const folders = await createFolderStructure(drive, fields.companyName);

    // Upload files
    const fileIds = {};
    if (files.pitchDeck) {
      fileIds.pitchDeckId = await uploadFile(
        drive,
        files.pitchDeck.filepath,
        `${fields.companyName}_PitchDeck${path.extname(files.pitchDeck.originalFilename)}`,
        folders.Pitch_Deck,
        files.pitchDeck.mimetype
      );
    }

    if (files.financials) {
      fileIds.financialsId = await uploadFile(
        drive,
        files.financials.filepath,
        `${fields.companyName}_Financials${path.extname(files.financials.originalFilename)}`,
        folders.Financials,
        files.financials.mimetype
      );
    }

    // Save submission data
    const submissionData = await saveSubmissionData(fields, fileIds);

    // Clean up temporary files
    Object.values(files).forEach(file => {
      fs.unlinkSync(file.filepath);
    });

    // Create metadata file
    const metadata = {
      submissionDate: new Date().toISOString(),
      companyInfo: {
        name: fields.companyName,
        website: fields.website,
        industry: fields.industry,
        stage: fields.stage,
        foundedYear: fields.foundedYear,
        location: fields.location,
      },
      teamInfo: {
        teamSize: fields.teamSize,
        founderNames: fields.founderNames,
        keyHires: fields.keyHires,
      },
      businessInfo: {
        problem: fields.problem,
        solution: fields.solution,
        targetMarket: fields.targetMarket,
        businessModel: fields.businessModel,
        competition: fields.competition,
        traction: fields.traction,
      },
      financialInfo: {
        currentRevenue: fields.currentRevenue,
        burnRate: fields.burnRate,
        runwayMonths: fields.runwayMonths,
        fundingNeeded: fields.fundingNeeded,
        useOfFunds: fields.useOfFunds,
      },
      fileIds,
      submissionId: submissionData.submissionId,
    };

    // Upload metadata to Google Drive
    await drive.files.create({
      requestBody: {
        name: `${fields.companyName}_Metadata.json`,
        parents: [folders.companyFolderId],
      },
      media: {
        mimeType: 'application/json',
        body: JSON.stringify(metadata, null, 2),
      },
    });

    // Send success response
    res.status(200).json({
      success: true,
      submissionId: submissionData.submissionId,
      message: 'Submission successfully processed',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process submission',
      details: error.message,
    });
  }
}