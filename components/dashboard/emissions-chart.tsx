import { emissionsData } from "@/lib/demo-data";

const chartWidth = 720;
const chartHeight = 280;

const padding = {
  top: 25,
  right: 20,
  bottom: 45,
  left: 55,
};

const maxValue = 1000;
const minValue = 600;

function getX(index: number) {
  const usableWidth =
    chartWidth - padding.left - padding.right;

  return (
    padding.left +
    (index * usableWidth) / (emissionsData.length - 1)
  );
}

function getY(value: number) {
  const usableHeight =
    chartHeight - padding.top - padding.bottom;

  return (
    padding.top +
    ((maxValue - value) / (maxValue - minValue)) *
      usableHeight
  );
}

export default function EmissionsChart() {
  const points = emissionsData
    .map((item, index) => {
      return `${getX(index)},${getY(item.emissions)}`;
    })
    .join(" ");

  const areaPoints = `${padding.left},${chartHeight - padding.bottom} ${points} ${
    chartWidth - padding.right
  },${chartHeight - padding.bottom}`;

  const yLabels = [1000, 900, 800, 700, 600];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Emissions Overview
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Monthly Scope-3 emissions across tracked shipments
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Scope-3 Emissions
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-[280px] min-w-[600px] w-full"
          role="img"
          aria-label="Monthly Scope-3 emissions chart"
        >
          {yLabels.map((value) => {
            const y = getY(value);

            return (
              <g key={value}>
                <line
                  x1={padding.left}
                  x2={chartWidth - padding.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  className="text-slate-100"
                  strokeWidth="1"
                />

                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[11px]"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <polygon
            points={areaPoints}
            className="fill-emerald-50"
          />

          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            className="text-emerald-600"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {emissionsData.map((item, index) => {
            const x = getX(index);
            const y = getY(item.emissions);

            return (
              <g key={item.month}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="currentColor"
                  className="text-emerald-600"
                  strokeWidth="3"
                />

                <text
                  x={x}
                  y={chartHeight - 17}
                  textAnchor="middle"
                  className="fill-slate-400 text-[11px]"
                >
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          Unit: tCO₂e
        </span>

        <span className="text-xs font-medium text-slate-600">
          6-month average: 804.3 tCO₂e
        </span>
      </div>
    </div>
  );
}