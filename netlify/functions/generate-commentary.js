// netlify/functions/generate-commentary.js
exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { OpenAI } = await import("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { risks, controls } = JSON.parse(event.body);

    if (!risks || !controls) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Risks and controls data are required" }),
      };
    }

    const systemPrompt = `
You are an operational risk officer reviewing the organization's GRC dashboard.

Please comment on:
- Identify any new record status or changes in risk or control status, as well as the effectiveness levels.
- Provide a brief summary of the overall GRC health, focusing on:
    - High risk areas (e.g., Major net risk + Poor control effectiveness)
    - Risks missing control linkages
    - Units or processes with recurring issues
- One recommendation for Line 2 to follow up on

Respond as a bolded header sections with short paragraph (internal tone).
`;

    const userPrompt = `
Here are the risks:
${JSON.stringify(risks, null, 2)}

And here are the controls:
${JSON.stringify(controls, null, 2)}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const commentary = response.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({ commentary }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
    };
  }
};
