"use client";

import { useState } from "react";
import JobForm from "@/components/job/JobForm";
import ResultsView from "@/components/application/ResultsView";
import { ApplicationResult } from "@/types/application";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApplicationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (jobDescription: string) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate result.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            AI Job Application Assistant
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-600">
            Paste a job description to generate a match analysis, cover letter,
            recruiter message, and interview questions.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <JobForm onSubmit={handleGenerate} loading={loading} />
          </div>

          <div className="space-y-4">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {result ? (
              <ResultsView result={result} />
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-sm text-zinc-500">
                Generated results will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}