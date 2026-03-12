import { ReactNode } from "react";

interface ResultCardProps {
  title: string;
  children: ReactNode;
}

export default function ResultCard({ title, children }: ResultCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h2>
      <div className="text-sm leading-7 text-zinc-700">{children}</div>
    </section>
  );
}