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
    <main className="min-h-[calc(100vh-128px)] px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="space-y-4 text-slate-100">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI-Powered
          </p>
          <h1 className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
            AI Job Application Assistant
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            Paste a job description and instantly generate match analysis, cover letters, recruiter messages, and interview preparation questions.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6">
            <JobForm onSubmit={handleGenerate} loading={loading} />
          </div>

          <div className="space-y-4">
            {error ? (
              <div className="rounded-md border border-red-500/40 bg-red-950/60 p-4 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            {loading ? (
              <div className="space-y-4">
                <div className="h-24 animate-pulse rounded-md bg-slate-800/80" />
                <div className="h-40 animate-pulse rounded-md bg-slate-800/80" />
                <div className="h-32 animate-pulse rounded-md bg-slate-800/80" />
              </div>
            ) : result ? (
              <ResultsView result={result} />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/50 p-8 text-sm text-slate-400">
                Generated results will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}