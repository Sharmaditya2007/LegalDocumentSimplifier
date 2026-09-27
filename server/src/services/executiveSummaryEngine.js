/**
 * Enterprise Executive Legal Summary & Report Synthesizer
 * Dynamic Version
 */

const generateExecutiveSummary = ({
  contractType,
  parties = ['Provider', 'Customer'],
  risks = [],
  obligations = [],
  deadlines = [],
  overallRiskScore,
  riskLevel
}) => {
  const criticalRisks = risks.filter(
    r => (r.level || r.severity || '').toLowerCase() === 'critical'
  );

  const highRisks = risks.filter(
    r => (r.level || r.severity || '').toLowerCase() === 'high'
  );

  const mediumRisks = risks.filter(
    r => (r.level || r.severity || '').toLowerCase() === 'medium'
  );

  const normalizedType = (contractType || '').toLowerCase();

  let overview = '';

  switch (normalizedType) {
    case 'nda':
    case 'mutual non-disclosure agreement':
    case 'mutual non-disclosure agreement (mnda)':

      overview =
        `This agreement establishes confidentiality obligations between ${parties.join(
          ' and '
        )}. It governs the disclosure, handling, protection, and permitted use of confidential information exchanged between the parties.`;
      break;

    case 'employment agreement':

      overview =
        `This employment agreement defines the legal relationship between ${parties.join(
          ' and '
        )}. It outlines compensation, responsibilities, confidentiality obligations, intellectual property ownership, and termination conditions.`;
      break;

    case 'master services agreement':
    case 'master services agreement (saas)':
    case 'saas':

      overview =
        `This SaaS agreement governs software subscriptions, service access, payment obligations, vendor responsibilities, service levels, renewal provisions, and liability allocation between ${parties.join(
          ' and '
        )}.`;
      break;

    case 'vendor agreement':

      overview =
        `This vendor agreement establishes commercial obligations between ${parties.join(
          ' and '
        )}, including product or service delivery, payment obligations, performance standards, and dispute resolution procedures.`;
      break;

    case 'partnership agreement':

      overview =
        `This partnership agreement defines ownership rights, profit sharing, management authority, liabilities, and operational responsibilities between the parties.`;
      break;

    case 'lease agreement':

      overview =
        `This lease agreement governs the use of property, rental payments, maintenance obligations, termination rights, and occupancy conditions between the parties.`;
      break;

    default:

      overview =
        `This ${contractType || 'commercial agreement'} establishes legally binding rights, obligations, liabilities, financial commitments, and operational responsibilities between ${parties.join(
          ' and '
        )}.`;
  }

  let riskNarrative = '';

  if (criticalRisks.length > 0 || highRisks.length > 0) {
    const topCategories = [
      ...new Set(
        [...criticalRisks, ...highRisks]
          .map(r => r.category)
          .filter(Boolean)
      )
    ].slice(0, 5);

    riskNarrative =
      `The AI Risk Sentinel identified ${
        criticalRisks.length + highRisks.length
      } significant legal risks. Key exposure areas include ${topCategories.join(
        ', '
      )}. These provisions may create financial exposure, operational constraints, liability imbalance, or unfavorable contractual obligations.`;
  } else {
    riskNarrative =
      `No major high-severity legal concerns were detected. The agreement primarily contains standard commercial terms with ${mediumRisks.length} moderate considerations requiring review.`;
  }

  const executiveSummary =
    `${overview} Overall risk score is ${overallRiskScore}/100 (${(
      riskLevel || 'low'
    ).toUpperCase()}). ${riskNarrative} The agreement contains ${
      obligations.length
    } identified contractual obligations and ${
      deadlines.length
    } key deadlines or milestone events. All flagged risk items should be reviewed before execution.`;

  let plainEnglish = '';

  switch (normalizedType) {
    case 'nda':
    case 'mutual non-disclosure agreement':
    case 'mutual non-disclosure agreement (mnda)':

      plainEnglish =
        `This document requires both parties to keep confidential information private. Shared information can only be used for approved business purposes and cannot be disclosed without permission.`;
      break;

    case 'employment agreement':

      plainEnglish =
        `This document explains the employee's role, salary, benefits, responsibilities, confidentiality duties, ownership of work product, and conditions for ending employment.`;
      break;

    case 'master services agreement':
    case 'master services agreement (saas)':
    case 'saas':

      plainEnglish =
        `This agreement allows the customer to use software services in exchange for subscription fees. It explains payment requirements, renewal rules, service commitments, limitations of liability, and customer responsibilities.`;
      break;

    case 'vendor agreement':

      plainEnglish =
        `This document defines what products or services the vendor must provide, how payments will be made, performance expectations, and what happens if either party fails to meet its obligations.`;
      break;

    case 'partnership agreement':

      plainEnglish =
        `This document explains how the partners will work together, share profits and losses, make decisions, and handle disputes or termination of the partnership.`;
      break;

    case 'lease agreement':

      plainEnglish =
        `This document explains rent payments, property usage rights, maintenance responsibilities, lease duration, and conditions for termination.`;
      break;

    default:

      plainEnglish =
        `This contract creates legally enforceable obligations between the parties and defines responsibilities, payments, liabilities, rights, deadlines, and risk allocation.`;
  }

  return {
    executiveSummary,
    plainEnglish,
    overview,
    riskNarrative
  };
};

module.exports = {
  generateExecutiveSummary
};
