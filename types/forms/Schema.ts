type SchemaFormFieldTypes =
  | "file"
  | "text"
  | "color"
  | "select"
  | "combobox"
  | "autocomplete"
  | "textarea"
  | "checkbox"
  | "radio"
  | "switch"
  | "slider"
  | "icon"
  | "image"
  | "btn"
  | "btn-toggle"
  | "list"
  | "treeview"
  | "array"
  | "group";

type SchemaSelectItemsType = {
  title: string;
  value: number | string;
};

interface SchemaFormTypeFile {
  type: Extract<SchemaFormFieldTypes, "file">;
  label?: string;
  multiple?: boolean;
  showSize?: boolean;
  counter?: boolean;
}

interface SchemaFormTypeText {
  type: Extract<SchemaFormFieldTypes, "text">;
  ext?: "color" | "range" | "date" | "time";
  label?: string;
  prependIcon?: string;
  clearable?: boolean;
}

interface SchemaFormTypeColor {
  type: Extract<SchemaFormFieldTypes, "color">;
  ext?: "text";
  label?: string;
  prependIcon?: string;
}

interface SchemaFormTypeTextarea {
  type: Extract<SchemaFormFieldTypes, "textarea">;
  label?: string;
  prependIcon?: string;
}

interface SchemaFormTypeSelect {
  type: Extract<SchemaFormFieldTypes, "select">;
  label?: string;
  items: SchemaSelectItemsType[];
  prependIcon?: string;
}
interface SchemaFormTypeCombobox {
  type: Extract<SchemaFormFieldTypes, "combobox">;
  label?: string;
  items: SchemaSelectItemsType[];
  prependIcon?: string;
}
interface SchemaFormTypeAutoComplete {
  type: Extract<SchemaFormFieldTypes, "autocomplete">;
  label?: string;
  multiple?: boolean;
  clearable?: boolean;
  items: SchemaSelectItemsType[];
  prependIcon?: string;
}

interface SchemaFormTypeCheckbox {
  type: Extract<SchemaFormFieldTypes, "checkbox">;
  label?: string;
}

interface SchemaFormTypeRadio {
  type: Extract<SchemaFormFieldTypes, "radio">;
  label?: string;
}

interface SchemaFormTypeSwitch {
  type: Extract<SchemaFormFieldTypes, "switch">;
  label?: string;
}

interface SchemaFormTypeSlider {
  type: Extract<SchemaFormFieldTypes, "slider">;
  label?: string;
}

interface SchemaFormTypeIcon {
  type: Extract<SchemaFormFieldTypes, "icon">;
  label?: string;
}

interface SchemaFormTypeImage {
  type: Extract<SchemaFormFieldTypes, "image">;
  label?: string;
  src: string;
}

interface SchemaFormTypeBtn {
  type: Extract<SchemaFormFieldTypes, "btn">;
  label?: string;
}

interface SchemaFormTypeBtnToggle {
  type: Extract<SchemaFormFieldTypes, "btn-toggle">;
  label?: string;
}

interface SchemaFormTypeList {
  type: Extract<SchemaFormFieldTypes, "list">;
  label?: string;
}

interface SchemaFormTypeTreeview {
  type: Extract<SchemaFormFieldTypes, "treeview">;
  label?: string;
}

interface SchemaFormTypeArray {
  type: Extract<SchemaFormFieldTypes, "array">;
  label?: string;
  key: "idx" | "ctrl";
  schema: SchemaArray;
}

interface SchemaFormTypeGroup {
  type: Extract<SchemaFormFieldTypes, "group">;
  label?: string;
  schema: SchemaArray;
}

type SchemaItem =
  | SchemaFormTypeFile
  | SchemaFormTypeText
  | SchemaFormTypeColor
  | SchemaFormTypeSelect
  | SchemaFormTypeCombobox
  | SchemaFormTypeAutoComplete
  | SchemaFormTypeTextarea
  | SchemaFormTypeCheckbox
  | SchemaFormTypeSwitch
  | SchemaFormTypeRadio
  | SchemaFormTypeSlider
  | SchemaFormTypeIcon
  | SchemaFormTypeImage
  | SchemaFormTypeBtn
  | SchemaFormTypeBtnToggle
  | SchemaFormTypeList
  | SchemaFormTypeTreeview
  | SchemaFormTypeArray
  | SchemaFormTypeGroup;

type SchemaItemValue = { value: string | string[] };

type SchemaItemWithValue = SchemaItemValue & SchemaItem;

interface SchemaArray {
  [key: string]: SchemaItem;
}

interface FormDataWithValue {
  [key: string]: SchemaItemWithValue;
}

interface SchemaModelResponse {
  schema: SchemaArray;
  model: {
    [key: string]: any;
  };
}

export type { SchemaArray, SchemaModelResponse, FormDataWithValue };
