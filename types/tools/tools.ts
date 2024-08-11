import type { SVGAttributes } from "vue";
import type { ProjectFile } from "../projects/projects";

type Band = "RED" | "GREEN" | "BLUE" | "NIR" | "SWIR1" | "SWIR2";

interface SelectedFiles {
  RED: ProjectFile | null;
  GREEN: ProjectFile | null;
  BLUE: ProjectFile | null;
  NIR: ProjectFile | null;
  SWIR1: ProjectFile | null;
  SWIR2: ProjectFile | null;
}

interface Action {
  title: string;
  type: string;
  icon: SVGAttributes | any;
}

export type { Band, SelectedFiles, Action };
