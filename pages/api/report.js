// pages/api/report.js
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { formatDistanceToNow } from 'date-fns';

// Initialize email transport
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
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

// Generate executive summary
function generateExecutiveSummary(analysis) {
  return `
    ${analysis.companyName} - Investment Opportunity Analysis
    
    Overall Score: ${analysis.metrics.overallScore}/10
    
    Key Highlights:
    • Market Opportunity: ${analysis.metrics.marketAnalysis.score}/10
    • Team Capability: ${analysis.metrics.teamAnalysis.score}/10
    • Product Viability: ${analysis.metrics.productAnalysis.score}/10
    
    Investment Recommendation: ${analysis.metrics.investmentRecommendation.recommendation}
    
    Financial Overview:
    • Monthly Burn Rate: $${analysis.financials.burnAnalysis.monthlyBurn.toLocaleString()}
    • Runway: ${analysis.financials.burnAnalysis.runwayMonths} months
    • Projected Growth: ${analysis.financials.revenueAnalysis.projectedGrowth}%
    
    Competitive Position: ${analysis.competitors.competitiveThreatLevel} threat level
  `.trim();
}

// Generate PDF report
async function generatePDFReport(analysis, metadata) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 72, left: 72, bottom: 72, right: 72 },
      info: {
        Title: `Investment Analysis Report - ${analysis.companyName}`,
        Author: 'Startup Analysis Platform',
        Subject: 'Startup Investment Analysis',
      },
    });

    const reportPath = path.join(process.cwd(), 'tmp', `${analysis.submissionId}_report.pdf`);
    const stream = fs.createWriteStream(reportPath);

    doc.pipe(stream);

    // Title Page
    doc
      .fontSize(24)
      .text('Investment Analysis Report', { align: 'center' })
      .moveDown()
      .fontSize(18)
      .text(analysis.companyName, { align: 'center' })
      .moveDown()
      .fontSize(12)
      .text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' })
      .moveDown(2);

    // Executive Summary
    doc
      .addPage()
      .fontSize(16)
      .text('Executive Summary', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(generateExecutiveSummary(analysis))
      .moveDown(2);

    // Company Overview
    doc
      .addPage()
      .fontSize(16)
      .text('Company Overview', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(`Industry: ${metadata.companyInfo.industry}`)
      .moveDown()
      .text(`Stage: ${metadata.companyInfo.stage}`)
      .moveDown()
      .text(`Location: ${metadata.companyInfo.location}`)
      .moveDown()
      .text(`Founded: ${metadata.companyInfo.foundedYear}`)
      .moveDown(2);

    // Market Analysis
    doc
      .addPage()
      .fontSize(16)
      .text('Market Analysis', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(analysis.metrics.marketAnalysis.explanation)
      .moveDown(2);

    // Team Analysis
    doc
      .fontSize(16)
      .text('Team Analysis', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(analysis.metrics.teamAnalysis.explanation)
      .moveDown(2);

    // Product Analysis
    doc
      .addPage()
      .fontSize(16)
      .text('Product Analysis', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(analysis.metrics.productAnalysis.explanation)
      .moveDown(2);

    // Financial Analysis
    doc
      .addPage()
      .fontSize(16)
      .text('Financial Analysis', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(analysis.financials.burnAnalysis.analysis)
      .moveDown()
      .text('Revenue Analysis:')
      .text(analysis.financials.revenueAnalysis.analysis)
      .moveDown()
      .text('Unit Economics:')
      .text(analysis.financials.unitEconomics.analysis)
      .moveDown(2);

    // Competitive Analysis
    doc
      .addPage()
      .fontSize(16)
      .text('Competitive Analysis', { underline: true })
      .moveDown()
      .fontSize(12);

    analysis.competitors.directCompetitors.forEach(competitor => {
      doc
        .text(`Competitor: ${competitor.name}`)
        .moveDown()
        .text('Strengths:')
        .list(competitor.strengths)
        .moveDown()
        .text('Weaknesses:')
        .list(competitor.weaknesses)
        .moveDown();
    });

    // Risk Analysis
    doc
      .addPage()
      .fontSize(16)
      .text('Risk Analysis', { underline: true })
      .moveDown()
      .fontSize(12)
      .text('Key Risks:')
      .list(analysis.metrics.riskAnalysis.risks)
      .moveDown()
      .text('Mitigation Strategies:')
      .list(analysis.metrics.riskAnalysis.mitigations)
      .moveDown(2);

    // Investment Recommendation
    doc
      .addPage()
      .fontSize(16)
      .text('Investment Recommendation', { underline: true })
      .moveDown()
      .fontSize(12)
      .text(analysis.metrics.investmentRecommendation.recommendation)
      .moveDown()
      .text(analysis.metrics.investmentRecommendation.rationale)
      .moveDown(2);

    // Finish the PDF
    doc.end();

    stream.on('finish', () => resolve(reportPath));
    stream.on('error', reject);
  });
}

// Send email with report
async function sendReportEmail(recipientEmail, reportPath, analysis) {
  const emailTemplate = `
    <h2>Investment Analysis Report - ${analysis.companyName}</h2>
    <p>Please find attached the detailed investment analysis report for ${analysis.companyName}.</p>
    
    <h3>Executive Summary</h3>
    <p>${generateExecutiveSummary(analysis)}</p>
    
    <p>For a detailed analysis, please review the attached PDF report.</p>
    
    <p>Best regards,<br>Startup Analysis Platform</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: recipientEmail,
    subject: `Investment Analysis Report - ${analysis.companyName}`,
    html: emailTemplate,
    attachments: [
      {
        filename: `${analysis.companyName}_Investment_Analysis.pdf`,
        path: reportPath,
      },
    ],
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { submissionId, recipientEmail } = req.body;

  if (!submissionId || !recipientEmail) {
    return res.status(400).json({ error: 'Submission ID and recipient email are required' });
  }

  try {
    const drive = initializeGoogleDrive();
    
    // Get analysis and metadata files
    const [analysisFile, metadataFile] = await Promise.all([
      drive.files.list({
        q: `name contains '${submissionId}_Analysis.json'`,
        fields: 'files(id, name)',
      }),
      drive.files.list({
        q: `name contains '${submissionId}_Metadata.json'`,
        fields: 'files(id, name)',
      }),
    ]);

    if (!analysisFile.data.files.length || !metadataFile.data.files.length) {
      return res.status(404).json({ error: 'Analysis or metadata not found' });
    }

    // Download analysis and metadata
    const [analysisContent, metadataContent] = await Promise.all([
      drive.files.get({
        fileId: analysisFile.data.files[0].id,
        alt: 'media',
      }),
      drive.files.get({
        fileId: metadataFile.data.files[0].id,
        alt: 'media',
      }),
    ]);

    const analysis = analysisContent.data;
    const metadata = metadataContent.data;

    // Generate PDF report
    const reportPath = await generatePDFReport(analysis, metadata);

    // Upload report to Google Drive
    const uploadResponse = await drive.files.create({
      requestBody: {
        name: `${analysis.companyName}_Investment_Analysis.pdf`,
        parents: [metadata.fileIds.companyFolderId],
      },
      media: {
        mimeType: 'application/pdf',
        body: fs.createReadStream(reportPath),
      },
    });

    // Send email with report
    await sendReportEmail(recipientEmail, reportPath, analysis);

    // Clean up temporary file
    fs.unlinkSync(reportPath);

    res.status(200).json({
      success: true,
      message: 'Report generated and sent successfully',
      reportId: uploadResponse.data.id,
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate or send report',
      details: error.message,
    });
  }
}