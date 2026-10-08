export type ComplianceStatus =
  | "COMPLIANT"
  | "AT RISK"
  | "NON-COMPLIANT";

export type CertificationStatus =
  | "CERTIFIED"
  | "PENDING"
  | "EXPIRED"
  | "NOT CERTIFIED";

export interface Supplier {
  id: string;
  name: string;
  country: string;
  industry: string;
  complianceStatus: ComplianceStatus;
  riskScore: number;
  certificationStatus: CertificationStatus;
  lastVerificationDate: string;
}

export const suppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Apex Components Pvt. Ltd.",
    country: "India",
    industry: "Electronics Manufacturing",
    complianceStatus: "COMPLIANT",
    riskScore: 18,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-28",
  },
  {
    id: "SUP-002",
    name: "GreenCore Materials",
    country: "Germany",
    industry: "Raw Materials",
    complianceStatus: "COMPLIANT",
    riskScore: 24,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-21",
  },
  {
    id: "SUP-003",
    name: "Pacific Industrial Solutions",
    country: "Vietnam",
    industry: "Industrial Equipment",
    complianceStatus: "AT RISK",
    riskScore: 56,
    certificationStatus: "PENDING",
    lastVerificationDate: "2026-08-19",
  },
  {
    id: "SUP-004",
    name: "NorthStar Textiles",
    country: "Bangladesh",
    industry: "Textiles",
    complianceStatus: "AT RISK",
    riskScore: 63,
    certificationStatus: "EXPIRED",
    lastVerificationDate: "2026-07-14",
  },
  {
    id: "SUP-005",
    name: "EcoPack Industries",
    country: "India",
    industry: "Packaging",
    complianceStatus: "COMPLIANT",
    riskScore: 21,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-30",
  },
  {
    id: "SUP-006",
    name: "BlueRiver Chemicals",
    country: "United States",
    industry: "Chemical Manufacturing",
    complianceStatus: "NON-COMPLIANT",
    riskScore: 86,
    certificationStatus: "EXPIRED",
    lastVerificationDate: "2026-06-11",
  },
  {
    id: "SUP-007",
    name: "TerraSteel Manufacturing",
    country: "Japan",
    industry: "Metals & Manufacturing",
    complianceStatus: "COMPLIANT",
    riskScore: 29,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-17",
  },
  {
    id: "SUP-008",
    name: "Sunrise Logistics",
    country: "Singapore",
    industry: "Logistics",
    complianceStatus: "AT RISK",
    riskScore: 51,
    certificationStatus: "PENDING",
    lastVerificationDate: "2026-08-27",
  },
  {
    id: "SUP-009",
    name: "GreenField Agriculture",
    country: "India",
    industry: "Agriculture",
    complianceStatus: "COMPLIANT",
    riskScore: 15,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-25",
  },
  {
    id: "SUP-010",
    name: "UrbanTech Components",
    country: "South Korea",
    industry: "Technology Components",
    complianceStatus: "NON-COMPLIANT",
    riskScore: 78,
    certificationStatus: "NOT CERTIFIED",
    lastVerificationDate: "2026-05-30",
  },
  {
    id: "SUP-011",
    name: "Oceanic Packaging Group",
    country: "Netherlands",
    industry: "Packaging",
    complianceStatus: "COMPLIANT",
    riskScore: 27,
    certificationStatus: "CERTIFIED",
    lastVerificationDate: "2026-09-12",
  },
  {
    id: "SUP-012",
    name: "Vertex Industrial Supplies",
    country: "India",
    industry: "Industrial Supplies",
    complianceStatus: "AT RISK",
    riskScore: 47,
    certificationStatus: "PENDING",
    lastVerificationDate: "2026-08-05",
  },
];