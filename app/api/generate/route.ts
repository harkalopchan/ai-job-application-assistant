import { NextResponse } from "next/server";
import { z } from "zod";
import { openai, OPENAI_MODEL } from "@/lib/ai/client";
import {
  generateRequestSchema,
  applicationResultSchema,
} from "@/server/schemas/generate.schema";
import {
  buildApplicationInstructions,
  buildApplicationInput,
} from "@/lib/ai/prompts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = generateRequestSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid request body.",
          details: parsedBody.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { jobDescription } = parsedBody.data;

    const response = await openai.responses.create({
      model: OPENAI_MODEL,
      instructions: buildApplicationInstructions(),
      input: buildApplicationInput(jobDescription),
      temperature: 0.4,
      max_output_tokens: 2500,
      text: {
        format: {
          type: "json_schema",
          name: "application_result",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              roleTitle: { type: "string" },
              companyName: { type: "string" },
              matchScore: { type: "number" },
              summary: { type: "string" },
              strengths: {
                type: "array",
                items: { type: "string" },
              },
              gaps: {
                type: "array",
                items: { type: "string" },
              },
              skillBreakdown: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    skill: { type: "string" },
                    level: {
                      type: "string",
                      enum: ["strong", "partial", "missing"],
                    },
                    note: { type: "string" },
                  },
                  required: ["skill", "level", "note"],
                },
              },
              coverLetter: { type: "string" },
              recruiterMessage: { type: "string" },
              interviewQuestions: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: [
              "roleTitle",
              "companyName",
              "matchScore",
              "summary",
              "strengths",
              "gaps",
              "skillBreakdown",
              "coverLetter",
              "recruiterMessage",
              "interviewQuestions",
            ],
          },
        },
      },
    });

    const raw = response.output_text;
    const json = JSON.parse(raw);
    const validated = applicationResultSchema.parse(json);

    return NextResponse.json(validated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "AI response validation failed.",
          details: error.flatten(),
        },
        { status: 500 }
      );
    }

    console.error("Generate route error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate application assets.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}