import { ApplicationResult } from "@/types/application";
import ResultCard from "./ResultCard";

interface ResultsViewProps {
  result: ApplicationResult;
}

export default function ResultsView({ result }: ResultsViewProps) {
  return (
    <div className="space-y-6">
      <ResultCard title="Match Overview">
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Role:</span> {result.roleTitle}
          </p>
          <p>
            <span className="font-semibold">Company:</span> {result.companyName}
          </p>
          <p>
            <span className="font-semibold">Match Score:</span>{" "}
            {result.matchScore}%
          </p>
          <p>{result.summary}</p>
        </div>
      </ResultCard>

      <ResultCard title="Strengths">
        <ul className="list-disc space-y-1 pl-5">
          {result.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="Gaps">
        <ul className="list-disc space-y-1 pl-5">
          {result.gaps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="Skill Breakdown">
        <div className="space-y-3">
          {result.skillBreakdown.map((item) => (
            <div
              key={`${item.skill}-${item.level}`}
              className="rounded-xl border border-zinc-200 p-3"
            >
              <p className="font-medium">
                {item.skill} —{" "}
                <span className="capitalize text-zinc-600">{item.level}</span>
              </p>
              <p className="text-zinc-600">{item.note}</p>
            </div>
          ))}
        </div>
      </ResultCard>

      <ResultCard title="Cover Letter">
        <div className="whitespace-pre-wrap">{result.coverLetter}</div>
      </ResultCard>

      <ResultCard title="Recruiter Message">
        <div className="whitespace-pre-wrap">{result.recruiterMessage}</div>
      </ResultCard>

      <ResultCard title="Interview Questions">
        <ol className="list-decimal space-y-2 pl-5">
          {result.interviewQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </ResultCard>
    </div>
  );
}