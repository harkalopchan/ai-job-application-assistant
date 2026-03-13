"use client";

import { useState } from "react";

interface JobFormProps {
  onSubmit: (jobDescription: string) => Promise<void>;
  loading: boolean;
}

export default function JobForm({ onSubmit, loading }: JobFormProps) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(jobDescription);
  };

  const isDisabled = loading || jobDescription.trim().length < 50;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="jobDescription"
          className="mb-2 block text-sm font-medium text-slate-100"
        >
          Paste job description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="min-h-[280px] w-full rounded-xl border border-slate-600/70 bg-slate-900/20 p-4 text-sm text-slate-100 outline-none transition focus:border-sky-400/80 focus:ring-1 focus:ring-sky-500/60"
        />
        <p className="mt-2 text-xs text-slate-400">
          Paste at least a reasonably complete job description for better
          analysis.
        </p>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate application"}
      </button>
    </form>
  );
}