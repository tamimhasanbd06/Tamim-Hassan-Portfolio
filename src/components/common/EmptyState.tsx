import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="dash-card flex min-h-64 flex-col items-center justify-center p-7 text-center sm:p-10">
      {icon ? <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-300/[.06] text-cyan-200">{icon}</div> : null}
      <h2 className="text-xl font-black text-white sm:text-2xl">{title}</h2>
      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
