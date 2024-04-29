import {
  CopyIcon,
  LayoutDashboardIcon,
  FormsIcon,
  PaperclipIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "خانه" },
  {
    title: "داشبورد",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  {
    title: "لیست مدارک سازمانی",
    icon: PaperclipIcon,
    to: "/forms/list/documents",
  },
  { header: "سیستم ها و روش ها" },
  {
    title: "ساخت روند",
    icon: CopyIcon,
    to: "/process",
  },
  { header: "فرم ها" },
  {
    title: "فرم ها",
    icon: FormsIcon,
    to: "/forms",
  },
  // {
  //   title: "Typography",
  //   icon: TypographyIcon,
  //   to: "/ui/typography",
  // },
  // {
  //   title: "Shadow",
  //   icon: CopyIcon,
  //   to: "/ui/shadow",
  // },
  // { header: "Extra" },
  // {
  //   title: "Icons",
  //   icon: MoodHappyIcon,
  //   to: "/icons",
  // },
  // {
  //   title: "Sample Page",
  //   icon: ApertureIcon,
  //   to: "/sample-page",
  // },
];

export default sidebarItem;
