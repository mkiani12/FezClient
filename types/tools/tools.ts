import type { SVGAttributes } from "vue";
import type { ProjectFile } from "../projects/projects";

type Band = "RED" | "GREEN" | "BLUE" | "NIR" | "SWIR1" | "SWIR2";

interface SelectedBands {
  RED: ProjectFile | null;
  GREEN: ProjectFile | null;
  BLUE: ProjectFile | null;
  NIR: ProjectFile | null;
  SWIR1: ProjectFile | null;
  SWIR2: ProjectFile | null;
}

interface SelectedFiles {
  bands: SelectedBands;
  before_after: {
    before: SelectedBands;
    after: SelectedBands;
  };
  tif: ProjectFile | null;
}

type ExtraParamDataTypes = "Number" | "String";

interface ExtraParam {
  title: string;
  type: ExtraParamDataTypes;
  required: boolean;
  value: string;
}

interface Action {
  title: string;
  type: string;
  icon: SVGAttributes | any;
  requiredBands: Band[];
  childrens?: Action[];
  extra_param?: Record<string, ExtraParam>;
}

type OperationModeValue = "bands" | "before_after" | "tif";

interface OperationMode {
  title: string;
  icon: SVGAttributes | any;
  value: OperationModeValue;
}

interface ActionList {
  bands: Action[];
  before_after: Action[];
  tif: Action[];
}

export type {
  Band,
  SelectedBands,
  SelectedFiles,
  Action,
  ActionList,
  OperationMode,
  OperationModeValue,
};
