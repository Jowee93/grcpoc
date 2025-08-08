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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.commentary;
  } catch (error) {
    console.error("Error generating commentary:", error);
    throw error;
  }
}
