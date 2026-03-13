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
          <div className="flex items-center gap-3">
            <p>
              <span className="font-semibold">Match Score:</span>{" "}
              {result.matchScore}%
            </p>
            <div className="flex flex-1 items-center gap-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400"
                  style={{ width: `${result.matchScore}%` }}
                />
              </div>
            </div>
          </div>
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
          {result.gaps.length > 0 ? (
            result.gaps.map((item) => <li key={item}>{item}</li>)
          ) : (
            <li>No major gaps were clearly identified from the job description.</li>
          )}
        </ul>
      </ResultCard>

      <ResultCard title="Skill Breakdown">
        <div className="space-y-3">
          {result.skillBreakdown.map((item) => (
            <div
              key={`${item.skill}-${item.level}`}
              className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3"
            >
              <p className="font-medium text-slate-100">
                {item.skill} —{" "}
                <span className="capitalize text-slate-300">{item.level}</span>
              </p>
              <p className="text-slate-300">{item.note}</p>
            </div>
          ))}
        </div>
      </ResultCard>

      <ResultCard title="Cover Letter" copyText={result.coverLetter}>
        <div className="whitespace-pre-wrap">{result.coverLetter}</div>
      </ResultCard>

      <ResultCard title="Recruiter Message" copyText={result.recruiterMessage}>
        <div className="whitespace-pre-wrap">{result.recruiterMessage}</div>
      </ResultCard>

      <ResultCard
        title="Interview Questions"
        copyText={result.interviewQuestions.join("\n")}
      >
        <ol className="list-decimal space-y-2 pl-5">
          {result.interviewQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </ResultCard>
    </div>
  );
}