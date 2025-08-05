// helper/generateAgentCommentary.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateAgentCommentary(risks, controls) {
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

  return response.choices[0].message.content.trim();
}
