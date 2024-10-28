// pages/api/analyze.js
import { google } from 'googleapis';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Google Drive client
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

// Download file from Google Drive
async function downloadFile(drive, fileId, localPath) {
  return new Promise((resolve, reject) => {
    drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        const dest = fs.createWriteStream(localPath);
        res.data
          .on('end', () => resolve(localPath))
          .on('error', err => reject(err))
          .pipe(dest);
      }
    );
  });
}

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    
    const response = await fetch('https://api.openai.com/v1/engines/whisper/transcribe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData
    });
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Analyze company metrics
async function analyzeMetrics(metadata, pitchDeckText) {
  const analysisPrompt = `
    Analyze this startup based on the following information:
    
    Company Information:
    ${JSON.stringify(metadata.companyInfo, null, 2)}
    
    Team Information:
    ${JSON.stringify(metadata.teamInfo, null, 2)}
    
    Business Information:
    ${JSON.stringify(metadata.businessInfo, null, 2)}
    
    Financial Information:
    ${JSON.stringify(metadata.financialInfo, null, 2)}
    
    Additional Context from Pitch Deck:
    ${pitchDeckText}
    
    Provide a detailed analysis covering:
    1. Market opportunity and potential
    2. Team capability and experience
    3. Product/solution viability
    4. Financial projections and funding requirements
    5. Competition and market positioning
    6. Key risks and mitigation strategies
    7. Investment recommendation
    
    Format the response as JSON with the following structure:
    {
      "marketAnalysis": { "score": number, "explanation": string },
      "teamAnalysis": { "score": number, "explanation": string },
      "productAnalysis": { "score": number, "explanation": string },
      "financialAnalysis": { "score": number, "explanation": string },
      "competitiveAnalysis": { "score": number, "explanation": string },
      "riskAnalysis": { "risks": string[], "mitigations": string[] },
      "investmentRecommendation": { "recommendation": string, "rationale": string },
      "overallScore": number
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert venture capital analyst with deep expertise in startup evaluation and market analysis."
      },
      {
        role: "user",
        content: analysisPrompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2500,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

// Analyze financial data
async function analyzeFinancials(metadata, financialsText) {
  const financialPrompt = `
    Analyze the following financial information:
    
    Financial Metrics:
    ${JSON.stringify(metadata.financialInfo, null, 2)}
    
    Additional Financial Details:
    ${financialsText}
    
    Provide a detailed financial analysis covering:
    1. Burn rate and runway analysis
    2. Revenue projections and growth metrics
    3. Unit economics
    4. Funding requirements and use of funds
    5. Key financial risks
    
    Format the response as JSON with the following structure:
    {
      "burnAnalysis": { "monthlyBurn": number, "runwayMonths": number, "analysis": string },
      "revenueAnalysis": { "projectedGrowth": number, "analysis": string },
      "unitEconomics": { "cac": number, "ltv": number, "analysis": string },
      "fundingAnalysis": { "recommendation": string, "rationale": string },
      "financialRisks": string[],
      "keyMetrics": {
        "grossMargin": number,
        "cacPayback": number,
        "revenueMultiple": number
      }
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert financial analyst specializing in startup financials and metrics."
      },
      {
        role: "user",
        content: financialPrompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

// Generate competitor analysis
async function analyzeCompetitors(metadata, pitchDeckText) {
  const competitorPrompt = `
    Analyze the competitive landscape based on:
    
    Industry: ${metadata.companyInfo.industry}
    Business Model: ${metadata.businessInfo.businessModel}
    Competition: ${metadata.businessInfo.competition}
    
    Additional Context:
    ${pitchDeckText}
    
    Provide a detailed competitor analysis covering:
    1. Direct and indirect competitors
    2. Competitive advantages and disadvantages
    3. Market positioning
    4. Barriers to entry
    
    Format the response as JSON with the following structure:
    {
      "directCompetitors": [{ "name": string, "strengths": string[], "weaknesses": string[] }],
      "indirectCompetitors": [{ "name": string, "threat": string, "mitigation": string }],
      "competitiveAdvantages": string[],
      "marketPositioning": { "current": string, "recommended": string },
      "barriersToEntry": string[],
      "competitiveThreatLevel": "LOW" | "MEDIUM" | "HIGH"
    }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "You are an expert in competitive analysis and market research."
      },
      {
        role: "user",
        content: competitorPrompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { submissionId } = req.body;

  if (!submissionId) {
    return res.status(400).json({ error: 'Submission ID is required' });
  }

  try {
    const drive = initializeGoogleDrive();
    
    // Get submission metadata
    const metadataFile = await drive.files.list({
      q: `name contains '${submissionId}_Metadata.json'`,
      fields: 'files(id, name)',
    });

    if (!metadataFile.data.files.length) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Download and parse metadata
    const tmpDir = path.join(process.cwd(), 'tmp');
    const metadataPath = path.join(tmpDir, 'metadata.json');
    await downloadFile(drive, metadataFile.data.files[0].id, metadataPath);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Download and process pitch deck
    const pitchDeckPath = path.join(tmpDir, 'pitch_deck.pdf');
    await downloadFile(drive, metadata.fileIds.pitchDeckId, pitchDeckPath);
    const pitchDeckText = await extractTextFromPDF(pitchDeckPath);

    // Download and process financials if available
    let financialsText = '';
    if (metadata.fileIds.financialsId) {
      const financialsPath = path.join(tmpDir, 'financials.pdf');
      await downloadFile(drive, metadata.fileIds.financialsId, financialsPath);
      financialsText = await extractTextFromPDF(financialsPath);
    }

    // Perform analyses
    const [metricsAnalysis, financialAnalysis, competitorAnalysis] = await Promise.all([
      analyzeMetrics(metadata, pitchDeckText),
      analyzeFinancials(metadata, financialsText),
      analyzeCompetitors(metadata, pitchDeckText)
    ]);

    // Compile complete analysis
    const completeAnalysis = {
      submissionId,
      timestamp: new Date().toISOString(),
      companyName: metadata.companyInfo.name,
      metrics: metricsAnalysis,
      financials: financialAnalysis,
      competitors: competitorAnalysis,
    };

    // Save analysis to Google Drive
    await drive.files.create({
      requestBody: {
        name: `${metadata.companyInfo.name}_Analysis.json`,
        parents: [metadata.fileIds.companyFolderId],
      },
      media: {
        mimeType: 'application/json',
        body: JSON.stringify(completeAnalysis, null, 2),
      },
    });

    // Clean up temporary files
    fs.unlinkSync(metadataPath);
    fs.unlinkSync(pitchDeckPath);
    if (metadata.fileIds.financialsId) {
      fs.unlinkSync(path.join(tmpDir, 'financials.pdf'));
    }

    res.status(200).json({
      success: true,
      analysis: completeAnalysis,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze submission',
      details: error.message,
    });
  }
}