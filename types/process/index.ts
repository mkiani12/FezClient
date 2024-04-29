import type { FormDataWithValue } from "~/types/forms/Schema";

interface LogItem {
  formName: string;
  name: string;
  positionTitle: string;
  job?: string;
  status: string;
  statusNumber: 1 | 2 | 3;
  time: string;
  formData: FormDataWithValue;
}

interface ProcessActives {
  id: string | number;
  name: string;
  position: string;
  step: string;
  time: number | string;
  title: string;
  unit: string;
  link: string;
  job?: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface ProcessInflows {
  id: string | number;
  position: string;
  step: string;
  time: number | string;
  title: string;
  unit: string;
  project: string;
  job?: string;
  metaDescription?: string;
  metaTitle?: string;
}

interface ProcessEnded {
  id: string | number;
  description: string;
  status: "rejected" | "ended";
  time: string;
  title: string;
  metaDescription?: string;
  metaTitle?: string;
}

export type { ProcessActives, ProcessInflows, ProcessEnded, LogItem };
