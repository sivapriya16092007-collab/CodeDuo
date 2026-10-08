"use client";

import { useMemo, useState } from "react";
import {
  suppliers,
  type ComplianceStatus,
  type CertificationStatus,
  type Supplier,
} from "@/lib/supplier-data";

function SearchIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 21h16" />
      <path d="M6 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16" />
      <path d="M9 8h2" />
      <path d="M13 8h2" />
      <path d="M9 12h2" />
      <path d="M13 12h2" />
      <path d="M9 16h2" />
      <path d="M13 16h2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m10.3 4.6-7.7 13A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.4l-7.7-13a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function getComplianceClasses(status: ComplianceStatus) {
  switch (status) {
    case "COMPLIANT":
      return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20";

    case "AT RISK":
      return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20";

    case "NON-COMPLIANT":
      return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20";
  }
}

function getCertificationClasses(status: CertificationStatus) {
  switch (status) {
    case "CERTIFIED":
      return "bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "bg-amber-50 text-amber-700";

    case "EXPIRED":
      return "bg-red-50 text-red-700";

    case "NOT CERTIFIED":
      return "bg-slate-100 text-slate-600";
  }
}

function getRiskLabel(score: number) {
  if (score <= 30) {
    return "Low";
  }

  if (score <= 60) {
    return "Medium";
  }

  return "High";
}

function getRiskClasses(score: number) {
  if (score <= 30) {
    return "bg-emerald-500";
  }

  if (score <= 60) {
    return "bg-amber-500";
  }

  return "bg-red-500";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function ComplianceBadge({
  status,
}: {
  status: ComplianceStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${getComplianceClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function CertificationBadge({
  status,
}: {
  status: CertificationStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${getCertificationClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}

function RiskScore({ score }: { score: number }) {
  return (
    <div className="min-w-[120px]">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-800">{score}</span>
        <span className="text-[11px] text-slate-500">
          {getRiskLabel(score)}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${getRiskClasses(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function SupplierDetails({
  supplier,
  onClose,
}: {
  supplier: Supplier;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/30 backdrop-blur-[2px]">
      <button
        aria-label="Close supplier details"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <aside className="relative h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Supplier details
              </p>

              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                {supplier.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{supplier.id}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <BuildingIcon />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Supplier
                </p>
                <p className="mt-0.5 font-semibold text-slate-900">
                  {supplier.name}
                </p>
              </div>
            </div>
          </div>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Compliance
            </h3>

            <div className="rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm text-slate-500">
                  ESG compliance
                </span>

                <ComplianceBadge status={supplier.complianceStatus} />
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm text-slate-500">Certification</span>

                <CertificationBadge
                  status={supplier.certificationStatus}
                />
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-slate-500">
                  Last verification
                </span>

                <span className="text-sm font-medium text-slate-800">
                  {formatDate(supplier.lastVerificationDate)}
                </span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Supplier information
            </h3>

            <div className="rounded-xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm text-slate-500">Supplier ID</span>
                <span className="text-sm font-medium text-slate-800">
                  {supplier.id}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span className="text-sm text-slate-500">Country</span>
                <span className="text-sm font-medium text-slate-800">
                  {supplier.country}
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-slate-500">Industry</span>
                <span className="max-w-[190px] text-right text-sm font-medium text-slate-800">
                  {supplier.industry}
                </span>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Risk score
              </h3>

              <span className="text-lg font-bold text-slate-900">
                {supplier.riskScore}/100
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <RiskScore score={supplier.riskScore} />

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Demo risk score for the current prototype. Actual risk
                calculations will be introduced in a later implementation
                step.
              </p>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [complianceFilter, setComplianceFilter] =
    useState<"ALL" | ComplianceStatus>("ALL");
  const [certificationFilter, setCertificationFilter] =
    useState<"ALL" | CertificationStatus>("ALL");

  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        supplier.name.toLowerCase().includes(normalizedSearch) ||
        supplier.id.toLowerCase().includes(normalizedSearch);

      const matchesCompliance =
        complianceFilter === "ALL" ||
        supplier.complianceStatus === complianceFilter;

      const matchesCertification =
        certificationFilter === "ALL" ||
        supplier.certificationStatus === certificationFilter;

      return (
        matchesSearch &&
        matchesCompliance &&
        matchesCertification
      );
    });
  }, [search, complianceFilter, certificationFilter]);

  const compliantCount = suppliers.filter(
    (supplier) => supplier.complianceStatus === "COMPLIANT"
  ).length;

  const atRiskCount = suppliers.filter(
    (supplier) => supplier.complianceStatus === "AT RISK"
  ).length;

  const nonCompliantCount = suppliers.filter(
    (supplier) => supplier.complianceStatus === "NON-COMPLIANT"
  ).length;

  return (
    <>
      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>Overview</span>
                <span>/</span>
                <span className="text-slate-700">Suppliers</span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Suppliers
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor supplier compliance, certification status, and
                supply-chain risk across your organization.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Add Supplier will be implemented in a later step."
                )
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <PlusIcon />
              Add Supplier
            </button>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Total suppliers
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {suppliers.length}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <BuildingIcon />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Compliant
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {compliantCount}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheckIcon />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    At risk
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {atRiskCount}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <AlertTriangleIcon />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Non-compliant
                  </p>

                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {nonCompliantCount}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <AlertTriangleIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Supplier table */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Filters */}
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="relative w-full xl:max-w-md">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by supplier name or ID..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex">
                  <select
                    value={complianceFilter}
                    onChange={(event) =>
                      setComplianceFilter(
                        event.target.value as
                          | "ALL"
                          | ComplianceStatus
                      )
                    }
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  >
                    <option value="ALL">All compliance statuses</option>
                    <option value="COMPLIANT">Compliant</option>
                    <option value="AT RISK">At Risk</option>
                    <option value="NON-COMPLIANT">
                      Non-Compliant
                    </option>
                  </select>

                  <select
                    value={certificationFilter}
                    onChange={(event) =>
                      setCertificationFilter(
                        event.target.value as
                          | "ALL"
                          | CertificationStatus
                      )
                    }
                    className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  >
                    <option value="ALL">
                      All certification statuses
                    </option>
                    <option value="CERTIFIED">Certified</option>
                    <option value="PENDING">Pending</option>
                    <option value="EXPIRED">Expired</option>
                    <option value="NOT CERTIFIED">
                      Not Certified
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredSuppliers.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {suppliers.length}
                  </span>{" "}
                  suppliers
                </p>

                {(search ||
                  complianceFilter !== "ALL" ||
                  certificationFilter !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setComplianceFilter("ALL");
                      setCertificationFilter("ALL");
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Supplier
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Industry
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Compliance
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Risk score
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Certification
                    </th>

                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Last verified
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      onClick={() => setSelectedSupplier(supplier)}
                      className="cursor-pointer transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <BuildingIcon />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {supplier.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {supplier.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {supplier.country}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {supplier.industry}
                      </td>

                      <td className="px-5 py-4">
                        <ComplianceBadge
                          status={supplier.complianceStatus}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <RiskScore score={supplier.riskScore} />
                      </td>

                      <td className="px-5 py-4">
                        <CertificationBadge
                          status={supplier.certificationStatus}
                        />
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(supplier.lastVerificationDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / tablet cards */}
            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredSuppliers.map((supplier) => (
                <button
                  key={supplier.id}
                  type="button"
                  onClick={() => setSelectedSupplier(supplier)}
                  className="block w-full p-4 text-left transition hover:bg-slate-50 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <BuildingIcon />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {supplier.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {supplier.id} · {supplier.country}
                        </p>
                      </div>
                    </div>

                    <ComplianceBadge
                      status={supplier.complianceStatus}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                        Industry
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {supplier.industry}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                        Certification
                      </p>

                      <div className="mt-1">
                        <CertificationBadge
                          status={supplier.certificationStatus}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                        Risk score
                      </p>

                      <span className="text-sm font-semibold text-slate-800">
                        {supplier.riskScore}/100
                      </span>
                    </div>

                    <RiskScore score={supplier.riskScore} />
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xs text-slate-500">
                      Last verified
                    </span>

                    <span className="text-xs font-medium text-slate-700">
                      {formatDate(supplier.lastVerificationDate)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Empty state */}
            {filteredSuppliers.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <SearchIcon />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  No suppliers found
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Try changing your search term or clearing one of the
                  filters.
                </p>
              </div>
            )}
          </section>

          <p className="mt-4 text-xs text-slate-400">
            Demo supplier data only. Database persistence and automated
            ESG risk calculations will be added in later implementation
            steps.
          </p>
        </div>
      </main>

      {selectedSupplier && (
        <SupplierDetails
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </>
  );
}