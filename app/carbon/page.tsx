"use client";

import { useMemo, useState } from "react";
import {
  calculateShipmentEmissions,
  demoShipments,
  formatNumber,
  type TransportMode,
} from "@/lib/sourcetrace-mvp";

export default function CarbonPage() {
  const [selectedMode, setSelectedMode] =
    useState<"All" | TransportMode>("All");

  const shipments = useMemo(() => {
    if (selectedMode === "All") {
      return demoShipments;
    }

    return demoShipments.filter(
      (shipment) => shipment.transportMode === selectedMode
    );
  }, [selectedMode]);

  const totalKg = shipments.reduce(
    (total, shipment) =>
      total + calculateShipmentEmissions(shipment),
    0
  );

  const bySupplier = groupEmissions(
    shipments,
    (shipment) => shipment.supplier
  );

  const byMode = groupEmissions(
    shipments,
    (shipment) => shipment.transportMode
  );

  const byMonth = groupEmissions(
    shipments,
    (shipment) => shipment.shipmentDate.slice(0, 7)
  );

  const maxSupplier = Math.max(
    ...Object.values(bySupplier),
    1
  );

  const maxMode = Math.max(...Object.values(byMode), 1);

  const maxMonth = Math.max(...Object.values(byMonth), 1);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              SourceTrace / Analytics
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Carbon Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Scope-3 transportation emissions calculated from the
              shipment register.
            </p>
          </div>

          <select
            value={selectedMode}
            onChange={(event) =>
              setSelectedMode(
                event.target.value as "All" | TransportMode
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-400"
          >
            <option value="All">All transport modes</option>
            <option value="Road">Road</option>
            <option value="Rail">Rail</option>
            <option value="Sea">Sea</option>
            <option value="Air">Air</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total Scope-3"
            value={`${formatNumber(totalKg)} kg`}
            sub={`${formatNumber(totalKg / 1000)} tonnes CO2e`}
          />

          <MetricCard
            label="Shipments"
            value={shipments.length.toString()}
            sub="Included in calculation"
          />

          <MetricCard
            label="Average / shipment"
            value={`${formatNumber(
              totalKg / Math.max(shipments.length, 1)
            )} kg`}
            sub="CO2e"
          />

          <MetricCard
            label="Highest mode"
            value={
              Object.entries(byMode).sort(
                (a, b) => b[1] - a[1]
              )[0]?.[0] ?? "—"
            }
            sub="By total emissions"
          />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <ChartCard
            title="Emissions by supplier"
            subtitle="kg CO2e"
          >
            <div className="space-y-5">
              {Object.entries(bySupplier).map(
                ([supplier, value]) => (
                  <BarRow
                    key={supplier}
                    label={supplier}
                    value={value}
                    max={maxSupplier}
                  />
                )
              )}
            </div>
          </ChartCard>

          <ChartCard
            title="Emissions by transport mode"
            subtitle="kg CO2e"
          >
            <div className="space-y-5">
              {Object.entries(byMode).map(([mode, value]) => (
                <BarRow
                  key={mode}
                  label={mode}
                  value={value}
                  max={maxMode}
                />
              ))}
            </div>
          </ChartCard>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <ChartCard
            title="Monthly emissions"
            subtitle="kg CO2e"
          >
            <div className="space-y-5">
              {Object.entries(byMonth).map(([month, value]) => (
                <BarRow
                  key={month}
                  label={formatMonth(month)}
                  value={value}
                  max={maxMonth}
                />
              ))}
            </div>
          </ChartCard>

          <ChartCard
            title="Emissions by shipment"
            subtitle="kg CO2e"
          >
            <div className="max-h-[340px] space-y-3 overflow-y-auto pr-2">
              {shipments.map((shipment) => {
                const emissions =
                  calculateShipmentEmissions(shipment);

                return (
                  <div
                    key={shipment.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-blue-700">
                        {shipment.id}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {shipment.supplier} ·{" "}
                        {shipment.transportMode}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-slate-900">
                      {formatNumber(emissions)} kg
                    </p>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>

        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">
            Scope-3 calculation methodology
          </p>
          <p className="mt-2 text-sm text-blue-700">
            CO2 kg = distance_km × weight_tonnes × emission_factor
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Factor label="Road" value="0.12" />
            <Factor label="Rail" value="0.04" />
            <Factor label="Sea" value="0.015" />
            <Factor label="Air" value="0.60" />
          </div>
        </div>
      </div>
    </main>
  );
}

function groupEmissions(
  shipments: typeof demoShipments,
  keyFn: (shipment: (typeof demoShipments)[number]) => string
) {
  return shipments.reduce<Record<string, number>>(
    (groups, shipment) => {
      const key = keyFn(shipment);

      groups[key] =
        (groups[key] ?? 0) +
        calculateShipmentEmissions(shipment);

      return groups;
    },
    {}
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-emerald-600">{sub}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}

function BarRow({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = Math.max((value / max) * 100, 3);

  return (
    <div>
      <div className="mb-2 flex justify-between gap-3 text-xs">
        <span className="font-medium text-slate-600">
          {label}
        </span>
        <span className="font-semibold text-slate-900">
          {formatNumber(value)} kg
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Factor({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span className="rounded-lg border border-blue-100 bg-white px-3 py-1.5 text-xs text-blue-700">
      {label}: {value} kg CO2e/tonne-km
    </span>
  );
}

function formatMonth(month: string) {
  const date = new Date(`${month}-01`);

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}