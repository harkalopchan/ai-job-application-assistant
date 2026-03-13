"use client";

import { ReactNode, useState } from "react";

interface ResultCardProps {
  title: string;
  children: ReactNode;
  copyText?: string;
}

export default function ResultCard({
  title,
  children,
  copyText,
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyText) return;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-50">{title}</h2>

        {copyText ? (
          <button
            onClick={handleCopy}
            className="rounded-full border border-sky-500/70 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100 transition hover:bg-sky-500/20"
            type="button"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>

      <div className="text-sm leading-7 text-slate-200">{children}</div>
    </section>
  );
}