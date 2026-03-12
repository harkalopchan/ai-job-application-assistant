export type MatchLevel = "strong" | "partial" | "missing";

export interface MatchItem {
  skill: string;
  level: MatchLevel;
  note: string;
}

export interface ApplicationResult {
  roleTitle: string;
  companyName: string;
  matchScore: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  skillBreakdown: MatchItem[];
  coverLetter: string;
  recruiterMessage: string;
  interviewQuestions: string[];
}

export interface GenerateRequestBody {
  jobDescription: string;
}