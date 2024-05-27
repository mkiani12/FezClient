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
  {
    title: "Dashboard",
    icon: "mdi-home-outline",
    to: "/",
  },
  {
    title: "First",
    icon: "mdi-account-edit-outline",
    to: "/first",
  },
  {
    title: "Dashboard",
    icon: "mdi-bed-outline",
    to: "/auth/login",
  },
  {
    title: "Dashboard",
    icon: "mdi-bed-outline",
    to: "/auth/login",
  },
  {
    title: "Dashboard",
    icon: "mdi-bed-outline",
    to: "/auth/login",
  },
  {
    title: "Dashboard",
    icon: "mdi-bed-outline",
    to: "/auth/login",
  },
  {
    title: "Dashboard",
    icon: "mdi-bed-outline",
    to: "/auth/login",
  },
];

export default sidebarItem;
