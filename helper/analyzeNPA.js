// helper/analyzeNPA.js
export async function analyzeNPA(productText) {
  try {
    const response = await fetch("/.netlify/functions/analyze-npa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productText }),
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
    return result;
  } catch (error) {
    console.error("Error analyzing NPA:", error);

    // Fallback for development/demo purposes
    return {
      summary:
        "Analysis unavailable - using demo data. The product appears to be a complex financial instrument requiring risk assessment.",
      risks: ["Demo Risk 1", "Demo Risk 2"],
      controlGaps: "Demo control gaps identified.",
      recommendations:
        "Add new control: Yes, demo recommendation for control implementation.",
      rationale: "Demo rationale for the recommendations provided.",
    };
  }
}

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

    // Fallback commentary
    return `**GRC Health Summary**
    
Current risk profile shows mixed effectiveness across controls. Several risks show "Poor/Fail" control effectiveness, particularly around operational processes.

**Key Areas of Concern**
- R00002 and R00004 showing Major/Moderate net risk with failed controls
- Control gaps evident in new product governance
- GFM unit showing multiple risk exposures

**Recommendation**
Line 2 should prioritize review of failed controls and assess adequacy of current control framework for new product initiatives.

*Note: This is a demo commentary as the AI service is currently unavailable.*`;
  }
}
