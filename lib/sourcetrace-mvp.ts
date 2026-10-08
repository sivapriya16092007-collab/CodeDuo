export type TransportMode = "Road" | "Rail" | "Sea" | "Air";

export type VerificationStatus =
  | "Verified"
  | "Pending"
  | "Flagged";

export type Shipment = {
  id: string;
  supplier: string;
  origin: string;
  destination: string;
  weightTonnes: number;
  distanceKm: number;
  transportMode: TransportMode;
  shipmentDate: string;
  verificationStatus: VerificationStatus;
};

export type DocumentRecord = {
  id: string;
  name: string;
  type: string;
  supplier: string;
  uploadDate: string;
  processingStatus: "Processed" | "Processing" | "Pending";
  extractedEntities: string[];
  verificationStatus: "Verified" | "Pending" | "Needs Review";
};

export type ComplianceStatus =
  | "VALID"
  | "EXPIRING SOON"
  | "EXPIRED";

export type SupplierCompliance = {
  supplier: string;
  certificate: string;
  status: ComplianceStatus;
  expiryDate: string;
  documentationCompleteness: number;
  carbonPerformance: number;
  shipmentVerification: number;
  complianceHistory: number;
};

export type LedgerEvent = {
  id: string;
  timestamp: string;
  supplier: string;
  shipmentId: string;
  eventType: string;
  description: string;
  co2ImpactKg: number;
  status: "Completed" | "Verified" | "Recorded";
};

export const EMISSION_FACTORS: Record<TransportMode, number> = {
  Road: 0.12,
  Rail: 0.04,
  Sea: 0.015,
  Air: 0.6,
};

export const demoShipments: Shipment[] = [
  {
    id: "SHP-1001",
    supplier: "GreenCore Materials",
    origin: "Chennai, India",
    destination: "Bengaluru, India",
    weightTonnes: 18,
    distanceKm: 350,
    transportMode: "Road",
    shipmentDate: "2026-10-02",
    verificationStatus: "Verified",
  },
  {
    id: "SHP-1002",
    supplier: "EcoSteel Industries",
    origin: "Mumbai, India",
    destination: "Chennai, India",
    weightTonnes: 32,
    distanceKm: 1330,
    transportMode: "Rail",
    shipmentDate: "2026-10-03",
    verificationStatus: "Verified",
  },
  {
    id: "SHP-1003",
    supplier: "BlueWave Logistics",
    origin: "Singapore",
    destination: "Chennai, India",
    weightTonnes: 45,
    distanceKm: 3200,
    transportMode: "Sea",
    shipmentDate: "2026-10-04",
    verificationStatus: "Pending",
  },
  {
    id: "SHP-1004",
    supplier: "AeroTech Components",
    origin: "Frankfurt, Germany",
    destination: "Chennai, India",
    weightTonnes: 6,
    distanceKm: 7600,
    transportMode: "Air",
    shipmentDate: "2026-10-05",
    verificationStatus: "Flagged",
  },
  {
    id: "SHP-1005",
    supplier: "GreenCore Materials",
    origin: "Chennai, India",
    destination: "Hyderabad, India",
    weightTonnes: 22,
    distanceKm: 630,
    transportMode: "Road",
    shipmentDate: "2026-10-05",
    verificationStatus: "Verified",
  },
  {
    id: "SHP-1006",
    supplier: "EcoSteel Industries",
    origin: "Pune, India",
    destination: "Chennai, India",
    weightTonnes: 27,
    distanceKm: 1200,
    transportMode: "Rail",
    shipmentDate: "2026-10-06",
    verificationStatus: "Verified",
  },
  {
    id: "SHP-1007",
    supplier: "BlueWave Logistics",
    origin: "Colombo, Sri Lanka",
    destination: "Chennai, India",
    weightTonnes: 38,
    distanceKm: 750,
    transportMode: "Sea",
    shipmentDate: "2026-10-07",
    verificationStatus: "Pending",
  },
  {
    id: "SHP-1008",
    supplier: "AeroTech Components",
    origin: "Singapore",
    destination: "Chennai, India",
    weightTonnes: 4,
    distanceKm: 2900,
    transportMode: "Air",
    shipmentDate: "2026-10-08",
    verificationStatus: "Verified",
  },
];

export const demoDocuments: DocumentRecord[] = [
  {
    id: "DOC-1001",
    name: "GreenCore_ISO14001.pdf",
    type: "Environmental Certificate",
    supplier: "GreenCore Materials",
    uploadDate: "2026-10-02",
    processingStatus: "Processed",
    extractedEntities: ["ISO 14001", "GreenCore Materials", "2027-08-14"],
    verificationStatus: "Verified",
  },
  {
    id: "DOC-1002",
    name: "EcoSteel_Environmental_Report.pdf",
    type: "Environmental Report",
    supplier: "EcoSteel Industries",
    uploadDate: "2026-10-03",
    processingStatus: "Processed",
    extractedEntities: ["ISO 14001", "EcoSteel Industries", "2027-04-20"],
    verificationStatus: "Verified",
  },
  {
    id: "DOC-1003",
    name: "BlueWave_Sustainability.pdf",
    type: "Sustainability Report",
    supplier: "BlueWave Logistics",
    uploadDate: "2026-10-04",
    processingStatus: "Processed",
    extractedEntities: ["GHG Protocol", "BlueWave Logistics", "2026-12-15"],
    verificationStatus: "Needs Review",
  },
  {
    id: "DOC-1004",
    name: "AeroTech_Certificate.pdf",
    type: "Compliance Certificate",
    supplier: "AeroTech Components",
    uploadDate: "2026-10-05",
    processingStatus: "Processed",
    extractedEntities: ["ISO 14001", "AeroTech Components", "2026-10-22"],
    verificationStatus: "Pending",
  },
];

export const supplierCompliance: SupplierCompliance[] = [
  {
    supplier: "GreenCore Materials",
    certificate: "ISO 14001",
    status: "VALID",
    expiryDate: "2027-08-14",
    documentationCompleteness: 95,
    carbonPerformance: 88,
    shipmentVerification: 96,
    complianceHistory: 94,
  },
  {
    supplier: "EcoSteel Industries",
    certificate: "ISO 14001",
    status: "VALID",
    expiryDate: "2027-04-20",
    documentationCompleteness: 92,
    carbonPerformance: 81,
    shipmentVerification: 94,
    complianceHistory: 91,
  },
  {
    supplier: "BlueWave Logistics",
    certificate: "GHG Protocol",
    status: "EXPIRING SOON",
    expiryDate: "2026-12-15",
    documentationCompleteness: 76,
    carbonPerformance: 74,
    shipmentVerification: 78,
    complianceHistory: 72,
  },
  {
    supplier: "AeroTech Components",
    certificate: "ISO 14001",
    status: "EXPIRED",
    expiryDate: "2026-09-30",
    documentationCompleteness: 61,
    carbonPerformance: 55,
    shipmentVerification: 68,
    complianceHistory: 52,
  },
];

export function calculateShipmentEmissions(
  shipment: Shipment
): number {
  const factor = EMISSION_FACTORS[shipment.transportMode];

  return (
    shipment.distanceKm *
    shipment.weightTonnes *
    factor
  );
}

export function calculateSupplierRisk(
  supplier: SupplierCompliance
): number {
  let certificationScore = 100;

  if (supplier.status === "EXPIRING SOON") {
    certificationScore = 70;
  }

  if (supplier.status === "EXPIRED") {
    certificationScore = 35;
  }

  const score =
    certificationScore * 0.3 +
    supplier.documentationCompleteness * 0.2 +
    supplier.carbonPerformance * 0.2 +
    supplier.shipmentVerification * 0.15 +
    supplier.complianceHistory * 0.15;

  return Math.round(score);
}

export function getRiskLabel(score: number): string {
  if (score >= 80) {
    return "Low";
  }

  if (score >= 60) {
    return "Medium";
  }

  return "High";
}

export function getRiskClasses(score: number): string {
  if (score >= 80) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (score >= 60) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-red-50 text-red-700 border-red-200";
}

export function getStatusClasses(status: string): string {
  switch (status) {
    case "Verified":
    case "VALID":
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Pending":
    case "EXPIRING SOON":
    case "Processing":
    case "Recorded":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Flagged":
    case "EXPIRED":
    case "Needs Review":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const demoLedgerEvents: LedgerEvent[] = [
  {
    id: "EVT-1001",
    timestamp: "2026-10-08T09:15:00",
    supplier: "GreenCore Materials",
    shipmentId: "SHP-1001",
    eventType: "Shipment submitted",
    description: "Shipment SHP-1001 was submitted for compliance review.",
    co2ImpactKg: 756,
    status: "Recorded",
  },
  {
    id: "EVT-1002",
    timestamp: "2026-10-08T09:30:00",
    supplier: "EcoSteel Industries",
    shipmentId: "SHP-1002",
    eventType: "Document processed",
    description: "Supplier environmental documentation was processed using demo extraction.",
    co2ImpactKg: 1702.4,
    status: "Completed",
  },
  {
    id: "EVT-1003",
    timestamp: "2026-10-08T10:00:00",
    supplier: "GreenCore Materials",
    shipmentId: "",
    eventType: "Certificate verified",
    description: "ISO 14001 certificate status was verified.",
    co2ImpactKg: 0,
    status: "Verified",
  },
  {
    id: "EVT-1004",
    timestamp: "2026-10-08T10:30:00",
    supplier: "BlueWave Logistics",
    shipmentId: "SHP-1003",
    eventType: "Emission calculated",
    description: "Scope-3 shipment emissions were calculated.",
    co2ImpactKg: 2160,
    status: "Completed",
  },
  {
    id: "EVT-1005",
    timestamp: "2026-10-08T11:00:00",
    supplier: "EcoSteel Industries",
    shipmentId: "",
    eventType: "Compliance updated",
    description: "Supplier compliance record was updated.",
    co2ImpactKg: 0,
    status: "Recorded",
  },
  {
    id: "EVT-1006",
    timestamp: "2026-10-08T11:30:00",
    supplier: "AeroTech Components",
    shipmentId: "",
    eventType: "Risk score updated",
    description: "Supplier risk score was recalculated from available compliance data.",
    co2ImpactKg: 0,
    status: "Recorded",
  },
];

export const ledgerStorageKey =
  "sourcetrace-ledger-events";

export const documentsStorageKey =
  "sourcetrace-documents";