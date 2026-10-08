"use client";

import { useMemo, useState } from "react";
import {
  calculateSupplierRisk,
  getRiskClasses,
  getRiskLabel,
  getStatusClasses,
  supplierCompliance,
  type ComplianceStatus,
} from "@/lib/sourcetrace-mvp";

export default function CompliancePage() {
  const [filter, setFilter] = useState<
    "All" | ComplianceStatus
  >("All");

  const filteredSuppliers = useMemo(() => {
    if (filter === "All") {
      return supplierCompliance;
    }

    return supplierCompliance.filter(
      (supplier) => supplier.status === filter
    );
  }, [filter]);

  const compliant = supplierCompliance.filter(
    (supplier) => supplier.status === "VALID"
  ).length;

  const atRisk = supplierCompliance.filter(
    (supplier) => supplier.status === "EXPIRING SOON"
  ).length;

  const nonCompliant = supplierCompliance.filter(
    (supplier) => supplier.status === "EXPIRED"
  ).length;

  const compliancePercentage =
    (compliant / supplierCompliance.length) * 100;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              SourceTrace / Governance
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Compliance
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor supplier certifications, expiry dates and
              calculated risk scores.
            </p>
          </div>

          <select
            value={filter}
            onChange={(event) =>
              setFilter(
                event.target.value as
                  | "All"
                  | ComplianceStatus
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-400"
          >
            <option value="All">All suppliers</option>
            <option value="VALID">Compliant</option>
            <option value="EXPIRING SOON">At risk</option>
            <option value="EXPIRED">Non-compliant</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Compliance"
            value={`${compliancePercentage.toFixed(0)}%`}
            description="Supplier certification compliance"
          />

          <SummaryCard
            label="Compliant"
            value={compliant.toString()}
            description="Valid certificates"
          />

          <SummaryCard
            label="At risk"
            value={atRisk.toString()}
            description="Expiring soon"
          />

          <SummaryCard
            label="Non-compliant"
            value={nonCompliant.toString()}
            description="Expired certificates"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Supplier Compliance Register
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Status rules: VALID = compliant · EXPIRING SOON =
              at risk · EXPIRED = non-compliant
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Certificate</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Expiry</th>
                  <th className="px-5 py-3">Risk score</th>
                  <th className="px-5 py-3">Risk</th>
                  <th className="px-5 py-3">Documentation</th>
                  <th className="px-5 py-3">Carbon</th>
                  <th className="px-5 py-3">Verification</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredSuppliers.map((supplier) => {
                  const risk = calculateSupplierRisk(supplier);

                  return (
                    <tr
                      key={supplier.supplier}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {supplier.supplier}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {supplier.certificate}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                            supplier.status
                          )}`}
                        >
                          {supplier.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {supplier.expiryDate}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900">
                          {risk}
                        </span>
                        <span className="text-slate-400">
                          /100
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getRiskClasses(
                            risk
                          )}`}
                        >
                          {getRiskLabel(risk)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Progress value={supplier.documentationCompleteness} />
                      </td>

                      <td className="px-5 py-4">
                        <Progress value={supplier.carbonPerformance} />
                      </td>

                      <td className="px-5 py-4">
                        <Progress value={supplier.shipmentVerification} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <RiskInfo
            title="Low Risk"
            range="80–100"
            description="Supplier demonstrates strong certification, documentation, carbon and compliance performance."
            className="border-emerald-100 bg-emerald-50"
          />

          <RiskInfo
            title="Medium Risk"
            range="60–79"
            description="Supplier requires monitoring and may have certification or performance gaps."
            className="border-amber-100 bg-amber-50"
          />

          <RiskInfo
            title="High Risk"
            range="0–59"
            description="Supplier has significant compliance, certification or verification concerns."
            className="border-red-100 bg-red-50"
          />
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-24">
      <div className="mb-1 flex justify-between text-[10px] text-slate-400">
        <span>{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function RiskInfo({
  title,
  range,
  description,
  className,
}: {
  title: string;
  range: string;
  description: string;
  className: string;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="text-xs font-bold text-slate-600">
          {range}
        </span>
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}