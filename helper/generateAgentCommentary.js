// helper/generateAgentCommentary.js
export async function generateAgentCommentary(risks, controls) {
  try {
    const response = await fetch("/.netlify/functions/generate-commentary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ risks, controls }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${
          errorData.details || "Unknown error"
        }`
      );
    }

    const result = await response.json();
    return result.commentary;
  } catch (error) {
    console.error("Error generating commentary:", error);

    // Fallback commentary with more detailed analysis
    const highRiskItems = risks.filter(
      (risk) =>
        risk.Net_Risk_Rating === "Major" ||
        (risk.Net_Risk_Rating === "Moderate" &&
          risk.Latest_Overall_Control_Effectiveness === "Poor/Fail")
    );

    const newRecords = risks.filter((risk) => risk.Record_Status === "New");
    const failedControls = controls.filter(
      (control) =>
        control.Latest_Control_Effectiveness === "Poor/Fail" ||
        control.Latest_Control_Effectiveness === "Fail"
    );

    return `**GRC Health Summary**
    
Current risk profile shows ${risks.length} active risks with ${
      highRiskItems.length
    } requiring immediate attention. ${
      newRecords.length > 0
        ? `${newRecords.length} new risk(s) added recently.`
        : "No new risks this period."
    }

**Key Areas of Concern**
${
  highRiskItems.length > 0
    ? `- ${highRiskItems
        .map((r) => r.Risk_ID)
        .join(", ")} showing elevated risk levels\n`
    : "- Overall risk profile appears stable\n"
}${
      failedControls.length > 0
        ? `- ${failedControls.length} control(s) showing Poor/Fail effectiveness\n`
        : "- Control effectiveness levels are satisfactory\n"
    }- GFM unit concentrates majority of operational risks

**Recommendation for Line 2**
${
  failedControls.length > 0
    ? "Priority review required for failed controls and assessment of control framework adequacy."
    : "Continue monitoring current risk trends and control effectiveness levels."
}

*Note: This is a demo commentary as the AI service is currently unavailable.*`;
  }
}
