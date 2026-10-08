import type { KpiMetric } from "@/lib/demo-data";

type KpiCardProps = {
  metric: KpiMetric;
};

function Icon({
  type,
}: {
  type: KpiMetric["icon"];
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    className: "h-5 w-5",
  };

  switch (type) {
    case "suppliers":
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M16 3.5a4 4 0 0 1 0 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "shipments":
      return (
        <svg {...common}>
          <path
            d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 7.5 12 12l8.5-4.5M12 12v9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "emissions":
      return (
        <svg {...common}>
          <path
            d="M20 4C12 4 5 7 5 14c0 3.31 2.69 6 6 6 7 0 10-7 9-16Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 20c3-5 7-8 13-11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "compliant":
      return (
        <svg {...common}>
          <path
            d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m8.5 12 2.2 2.2 4.8-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "risk":
      return (
        <svg {...common}>
          <path
            d="M12 3 21 20H3L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 9v4M12 17h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "nonCompliant":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="m9 9 6 6M15 9l-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function KpiCard({ metric }: KpiCardProps) {
  const isNegative =
    metric.icon === "risk" || metric.icon === "nonCompliant";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isNegative
              ? "bg-amber-50 text-amber-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          <Icon type={metric.icon} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          Live data
        </span>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">{metric.title}</p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {metric.value}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {metric.description}
        </p>
      </div>
    </div>
  );
}