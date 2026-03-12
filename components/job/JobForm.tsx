"use client";

import { useState } from "react";

interface JobFormProps {
  onSubmit: (jobDescription: string) => Promise<void>;
  loading: boolean;
}

export default function JobForm({ onSubmit, loading }: JobFormProps) {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    await onSubmit(jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="jobDescription"
          className="mb-2 block text-sm font-medium text-zinc-800"
        >
          Paste job description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="min-h-[260px] w-full rounded-2xl border border-zinc-300 p-4 text-sm outline-none ring-0 transition focus:border-zinc-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading || jobDescription.trim().length < 50}
        className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate application"}
      </button>
    </form>
  );
}