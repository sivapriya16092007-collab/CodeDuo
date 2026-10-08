"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  demoDocuments,
  documentsStorageKey,
  getStatusClasses,
  type DocumentRecord,
  formatDate,
} from "@/lib/sourcetrace-mvp";

export default function DocumentsPage() {
  const [documents, setDocuments] =
    useState<DocumentRecord[]>(demoDocuments);

  useEffect(() => {
    const stored = localStorage.getItem(documentsStorageKey);

    if (stored) {
      try {
        setDocuments(JSON.parse(stored));
      } catch {
        setDocuments(demoDocuments);
      }
    } else {
      localStorage.setItem(
        documentsStorageKey,
        JSON.stringify(demoDocuments)
      );
    }
  }, []);

  function saveDocuments(next: DocumentRecord[]) {
    setDocuments(next);
    localStorage.setItem(
      documentsStorageKey,
      JSON.stringify(next)
    );
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const newDocument: DocumentRecord = {
      id: `DOC-${Date.now().toString().slice(-6)}`,
      name: file.name,
      type: detectDocumentType(file.name),
      supplier: "Demo Supplier",
      uploadDate: new Date().toISOString().slice(0, 10),
      processingStatus: "Processed",
      extractedEntities: [
        "Demo extraction",
        "Document name detected",
        "File type detected",
      ],
      verificationStatus: "Pending",
    };

    saveDocuments([newDocument, ...documents]);

    event.target.value = "";
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              SourceTrace / Documents
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Document Processing
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Upload supplier documents and track demo processing,
              extracted entities and verification status.
            </p>
          </div>

          <label className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            + Upload Document
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <div className="mt-0.5 text-amber-600">●</div>

            <div>
              <p className="text-sm font-semibold text-amber-900">
                Demo extraction mode
              </p>
              <p className="mt-1 text-xs leading-5 text-amber-700">
                No external AI or backend service is connected.
                Uploaded files are represented as local demo records
                and their extracted entities are simulated.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Document Register
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {documents.length} documents available
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Document</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">Upload date</th>
                  <th className="px-5 py-3">Processing</th>
                  <th className="px-5 py-3">Extracted entities</th>
                  <th className="px-5 py-3">Verification</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {documents.map((document) => (
                  <tr
                    key={document.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">
                        {document.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {document.id}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {document.type}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {document.supplier}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      {formatDate(document.uploadDate)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          document.processingStatus
                        )}`}
                      >
                        {document.processingStatus}
                      </span>
                    </td>

                    <td className="max-w-[320px] px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {document.extractedEntities.map(
                          (entity) => (
                            <span
                              key={entity}
                              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                            >
                              {entity}
                            </span>
                          )
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                          document.verificationStatus
                        )}`}
                      >
                        {document.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Documents"
            value={documents.length.toString()}
            description="Tracked local records"
          />

          <InfoCard
            title="Processed"
            value={documents
              .filter(
                (document) =>
                  document.processingStatus === "Processed"
              )
              .length.toString()}
            description="Demo processed records"
          />

          <InfoCard
            title="Needs review"
            value={documents
              .filter(
                (document) =>
                  document.verificationStatus !== "Verified"
              )
              .length.toString()}
            description="Awaiting verification"
          />
        </div>
      </div>
    </main>
  );
}

function detectDocumentType(name: string): string {
  const lower = name.toLowerCase();

  if (lower.includes("certificate")) {
    return "Compliance Certificate";
  }

  if (lower.includes("sustain")) {
    return "Sustainability Report";
  }

  if (lower.includes("environment")) {
    return "Environmental Report";
  }

  return "Supplier Document";
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}