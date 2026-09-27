const { v4: uuidv4 } = require('uuid');
const { extractDocumentStructure } = require('./documentUnderstandingEngine');
const { segmentDocumentIntoClauses, detectAllContractRisks } = require('./clauseExtractionEngine');
const { analyzeContractClauses } = require('./legalReasoningEngine');
const { calculateDynamicRiskScore } = require('./scoringEngine');
const { extractContractTimeline } = require('./timelineEngine');
const { extractContractObligations } = require('./obligationEngine');
const { compareContracts } = require('./comparisonEngine');
const { generateExecutiveSummary } = require('./executiveSummaryEngine');
const { answerLegalCopilotQuery } = require('./copilotEngine');

/**
 * Enterprise 5-Layer Contract Intelligence Pipeline
 * Generalizes across all legal document types:
 * - NDA & Confidentiality Agreements
 * - SaaS & Cloud Subscription MSAs
 * - Statements of Work (SOW) & Service Agreements
 * - Vendor & Procurement Contracts
 * - Executive Employment & Severance Agreements
 * - Independent Contractor & Consulting Agreements
 * - Software Licensing & EULAs
 * - Commercial Real Estate & Equipment Leases
 * - Partnership, Joint Venture & Franchise Agreements
 * - Privacy Policies & Platform Terms of Service
 * - Custom & Unseen Legal Agreements
 */

const analyzeDocumentHeuristic = (text, fileName = '') => {
  const cleanText = text || '';
  const lower = cleanText.toLowerCase();

  // 1. Precise Contract Type Classification
  let contractType = 'Commercial Legal Agreement';
  if (lower.includes('non-disclosure') || lower.includes('confidentiality agreement') || lower.includes('mutual nda') || lower.includes('proprietary information agreement')) {
    contractType = 'Mutual Non-Disclosure Agreement (MNDA)';
  } else if (lower.includes('master services agreement') || lower.includes('saas') || lower.includes('subscription services agreement') || lower.includes('software as a service')) {
    contractType = 'Master Services Agreement (SaaS)';
  } else if (lower.includes('statement of work') || lower.includes('sow') || lower.includes('work order')) {
    contractType = 'Statement of Work (SOW)';
  } else if (lower.includes('employment agreement') || lower.includes('executive employment') || lower.includes('offer letter') || lower.includes('severance agreement')) {
    contractType = 'Executive Employment Agreement';
  } else if (lower.includes('consulting agreement') || lower.includes('independent contractor') || lower.includes('professional services agreement')) {
    contractType = 'Independent Contractor & Consulting Agreement';
  } else if (lower.includes('vendor agreement') || lower.includes('supplier agreement') || lower.includes('procurement contract')) {
    contractType = 'Vendor & Procurement Agreement';
  } else if (lower.includes('license agreement') || lower.includes('eula') || lower.includes('software license')) {
    contractType = 'Software License Agreement (EULA)';
  } else if (lower.includes('lease agreement') || lower.includes('commercial lease') || lower.includes('tenant') || lower.includes('landlord')) {
    contractType = 'Commercial Lease Agreement';
  } else if (lower.includes('partnership agreement') || lower.includes('joint venture') || lower.includes('franchise agreement')) {
    contractType = 'Strategic Partnership & Alliance Agreement';
  } else if (lower.includes('privacy policy') || lower.includes('data processing addendum') || lower.includes('terms of service') || lower.includes('terms of use')) {
    contractType = 'Platform Terms of Service & Privacy Policy';
  }

  // LAYER 1: Document Understanding & Structuring
  const docStructure = extractDocumentStructure(cleanText, fileName);
  const parties = docStructure.parties;
  const effectiveDate = docStructure.dates.effectiveDate;
  const expiryDate = docStructure.dates.expirationDate;

  // LAYER 2: Clause Segmentation
  const rawSegments = segmentDocumentIntoClauses(cleanText);

  // LAYER 3: Structural Legal Reasoning & Asymmetry Analysis
  // Decomposes clauses by subject, deontic modality, beneficiary, obligatedParty, riskBearingParty, asymmetryScore, exposureProfile
  const analyzedClauses = analyzeContractClauses(rawSegments);

  // LAYER 4: Multi-Risk Legal Reasoning across 30 Enterprise Risk Categories
  // SINGLE SOURCE OF TRUTH: Passes structured clause analysis into risk detection
  const detectedRisks = detectAllContractRisks(cleanText, fileName, analyzedClauses);

  // LAYER 5: Dynamic Risk Scoring & Profile
  const scoreResult = calculateDynamicRiskScore(detectedRisks, { contractType, parties });
  const { overallRiskScore, riskLevel, riskRating, exposureProfile, riskCounts, riskDistribution } = scoreResult;

  // Extract Obligations
  const obligations = extractContractObligations(cleanText, parties);

  // Extract Timeline Events & Milestones
  const deadlines = extractContractTimeline(cleanText, effectiveDate, expiryDate);

  // Commercial Terms
  const paymentTerms = docStructure.financial_terms;
  const renewalConditions = docStructure.renewal_terms;
  const complianceRequirements = `${docStructure.governing_law}; ${docStructure.jurisdiction}; ${docStructure.confidentiality}`;

  // Synthesize Executive Summary from the canonical risk dataset
  const executiveSummaries = generateExecutiveSummary({
    contractType,
    parties,
    risks: detectedRisks,
    obligations,
    deadlines,
    overallRiskScore,
    riskLevel
  });

  return {
    overallRiskScore,
    riskLevel,
    riskRating,
    exposureProfile,
    riskCounts,
    riskDistribution,
    analysis: {
      parties,
      contractType,
      effectiveDate,
      expiryDate,
      executiveSummary: executiveSummaries.executiveSummary,
      plainEnglish: executiveSummaries.plainEnglish,
      paymentTerms,
      renewalConditions,
      complianceRequirements,
      risks: detectedRisks, // Single Source of Truth
      clauses: analyzedClauses, // Structurally reasoned clauses with asymmetry & exposure metadata
      obligations,
      deadlines,
      structuredContract: docStructure
    }
  };
};

/**
 * Side-by-Side Contract Revision Comparison Engine
 */
const compareDocumentsHeuristic = (docA, docB) => {
  return compareContracts(docA, docB);
};

/**
 * Enterprise Legal Copilot Assistant
 */
const generateChatAnswer = async (question, documentText, documentAnalysis, messageHistory = []) => {
  return answerLegalCopilotQuery(question, documentText, documentAnalysis, messageHistory);
};

module.exports = {
  analyzeDocumentHeuristic,
  compareDocumentsHeuristic,
  generateChatAnswer
};
