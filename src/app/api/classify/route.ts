import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { messages } from "./messages";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const completion = await openai.chat.completions.create({
      messages: [
        ...messages,
        {
          role: "user",
          content: JSON.stringify(data),
        },
      ],
      temperature: 0,
      model: "gpt-4o",
    });

    const gptResponse = completion.choices[0];
    const gptResponseContent = gptResponse.message.content;
    const gptParsedObject = JSON.parse(gptResponseContent || "");
    return NextResponse.json({
      message: "Mails classified successfully",
      categories: gptParsedObject,
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { message: "Error parsing request body" },
      { status: 400 }
    );
  }
}
