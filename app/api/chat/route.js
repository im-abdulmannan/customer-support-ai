import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const data = await req.json();

  const systemPrompt =
    "You are a helpful assistant that provides creative writing.";
  const prompt = data.prompt || "Write a story about a magic backpack.";

  const completion = await genAI
    .getGenerativeModel({ model: "gemini-1.5-pro" })
    .generateContent(prompt);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const content = await completion.response.text();
        if (content) {
          const text = encoder.encode(content);
          controller.enqueue(text);
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
