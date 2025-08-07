import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_PUBLIC_OPENAI_API_KEY,
});

const mockRiskLibrary = ["Liquidity Risk", "Operational Risk", "Market Risk"];
const mockControlLibrary = {
  "Liquidity Risk": "Daily liquidity reports",
  "Operational Risk": "Incident escalation process",
};

export async function analyzeNPA(productText) {
  const systemPrompt = `
You are an operational risk officer simulating a GRC impact assessment for a new product. Assume the new product is from Global Financial Markets and involves complex financial instruments.

1. Summarize the product in 3 concise sentences.
2. Identify 2–3 key risks using standard risk taxonomy (e.g., Liquidity Risk, Conduct Risk, Distribution Risk).
3. Determine:
   - Are any risks new (not in current GRC library)?
   - Are there any missing controls for the risks?
4. Recommend next steps:
   - Add new risk? [No]
   - Add new control? [Yes]
   - Alert Line 2? [No]
5. End with a brief justification (2 sentences) for your recommendation.

Respond in this format:

Summary:
...

Risks Identified:
- Delayed project risk mitigation
- xx

Control Gaps:
- Need to add a new control for Risk ID (R00001) given the new product's complexity.
- xx

Recommendations:
- Add new risk: No
- Add new control: Yes, suggested proper controls to be in place. Elaborate description.
- Alert Line 2: No

Rationale:
...
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: productText },
    ],
  });

  const text = response.choices[0].message.content;

  const summary = text.match(/Summary:\s([\s\S]*?)\n\n/)?.[1]?.trim();
  const risks = Array.from(text.matchAll(/^- (.*?)$/gm)).map((m) => m[1]);
  const controlGaps = text.match(/Control Gaps:\s([\s\S]*?)\n\n/)?.[1]?.trim();
  const recommendations = text
    .match(/Recommendations:\s([\s\S]*?)\n\n/)?.[1]
    ?.trim();
  const rationale = text.match(/Rationale:\s([\s\S]*)/)?.[1]?.trim();

  return {
    summary,
    risks,
    controlGaps,
    recommendations,
    rationale,
  };
}
