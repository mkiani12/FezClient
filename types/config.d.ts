export {};
import { Emitter } from "mitt";

interface PluginsInjections {
  $event: Emitter["emit"];
  $listen: Emitter["on"];
  $off: Emitter["off"];
}

declare module "#app" {
  interface NuxtApp extends PluginsInjections {}
}

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp extends PluginsInjections {}
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends PluginsInjections {}
}

declare global {
  interface JobData {
    id?: number | string;
    postTitle?: string;
    project?: string;
    postId?: number | string;
    projectId?: number | string;
    level?: number | string;
    unitId?: number | string;
    unitTitle?: string;
    companyId?: number | string;
    companyName?: string;
  }

  interface UserInformations {
    firstname?: string;
    lastname?: string;
    UserId?: number | string;
    NationalCode?: string;
  }

  interface SessionData {
    userInformations?: UserInformations;
    userPositions?: JobData[];
  }
}
