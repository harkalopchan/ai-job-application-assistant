import { z } from "zod";

export const generateRequestSchema = z.object({
  jobDescription: z
    .string()
    .min(50, "Please paste a full and detailed job description.")
    .max(15000, "Job description is too long."),
});

export const applicationResultSchema = z.object({
  roleTitle: z.string(),
  companyName: z.string(),
  matchScore: z.number().min(0).max(100),
  summary: z.string(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  skillBreakdown: z.array(
    z.object({
      skill: z.string(),
      level: z.enum(["strong", "partial", "missing"]),
      note: z.string(),
    })
  ),
  coverLetter: z.string(),
  recruiterMessage: z.string(),
  interviewQuestions: z.array(z.string()).min(3).max(8),
});

export type ApplicationResultSchema = z.infer<typeof applicationResultSchema>;