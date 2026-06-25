import Groq from "groq-sdk";

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side API demo environments
});

export async function getRecommendations(userInput, productCatalog) {
  if (!import.meta.env.VITE_GROQ_API_KEY) {
    throw new Error("Groq API key not found. Please define VITE_GROQ_API_KEY in your .env file.");
  }

  const systemPrompt = `You are an expert product recommendation system for Spearmint Electronics.
Analyze the user's preference query against the product catalog and return a list of recommendations in strict JSON format.

Product Catalog:
${JSON.stringify(productCatalog, null, 2)}

Instructions:
1. Match products that fulfill the user's intent, category preference, and budget (prices are in USD).
2. Return a JSON object with a single key "recommendations", containing an array of objects.
3. Each recommendation object must have:
   - "id": The product's numeric ID (MUST match an ID from the catalog).
   - "reason": A brief, user-focused 1-sentence explanation of why this product is recommended for their query.
4. Only suggest products that exist in the catalog.
5. If no products match, return an empty array for "recommendations".

Example response format:
{
  "recommendations": [
    {
      "id": 1,
      "reason": "The iPhone 13 fits your preference for an iOS device under $500."
    }
  ]
}`;

  const startTime = performance.now();
  
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `User query: "${userInput}"`
      }
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" }
  });

  const duration = (performance.now() - startTime).toFixed(0);
  const rawResponse = chatCompletion.choices[0].message.content;
  const parsedData = JSON.parse(rawResponse);

  return {
    recommendations: parsedData.recommendations || [],
    metadata: {
      systemPrompt,
      userPrompt: `User query: "${userInput}"`,
      rawResponse,
      model: "llama-3.3-70b-versatile",
      latencyMs: duration
    }
  };
}
