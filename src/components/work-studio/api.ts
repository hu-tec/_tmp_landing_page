export const WORK_STUDIO_API_BASE =
  process.env.NEXT_PUBLIC_WORK_STUDIO_API ?? "http://54.116.15.136";

export type FieldType =
  | "text"
  | "tel"
  | "email"
  | "textarea"
  | "multiselect"
  | "checkbox";

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormSection {
  moduleId: string;
  name: string;
  roleGroup: string;
  role: string;
  category: string;
  fields: FormField[];
  evaluable?: boolean;
  phase: string;
}

export interface FormConfig {
  site: string;
  formId: string;
  phase: "part1" | "part2";
  phases: Record<string, string[]>;
  displayName: string;
  shortName: string;
  sections: FormSection[];
  siteInfo: {
    id: string;
    name: string;
    icon: string;
    color: string;
    url: string;
    category: string;
  };
  submitUrl: string;
  version: number;
}

export interface SubmitPayload {
  _site: string;
  _formId: string;
  _role: string;
  _phase: string;
  _status?: number;
  _submitted: boolean;
  _dummy?: boolean;
  _notes?: string;
  part1?: Record<string, unknown>;
  part2?: Record<string, unknown>;
}

export interface SubmitResult {
  success: boolean;
  id: number;
}

export interface ApplicationRecord {
  id: number;
  data: string;
  created_at: string;
}

export async function fetchFormConfig(
  site: string,
  formId: string,
  phase: "part1" | "part2"
): Promise<FormConfig> {
  const res = await fetch(
    `${WORK_STUDIO_API_BASE}/api/form-config/${site}/${formId}?phase=${phase}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`form-config ${phase} HTTP ${res.status}`);
  return res.json();
}

export async function submitApplication(
  payload: SubmitPayload
): Promise<SubmitResult> {
  const res = await fetch(`${WORK_STUDIO_API_BASE}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`submit HTTP ${res.status}`);
  return res.json();
}

export async function getApplication(
  id: number
): Promise<ApplicationRecord> {
  const res = await fetch(`${WORK_STUDIO_API_BASE}/api/applications/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`get HTTP ${res.status}`);
  return res.json();
}
