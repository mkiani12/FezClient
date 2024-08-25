import ImageEnhancementIcon from "~icons/carbon/edge-enhancement";
import FiltersIcon from "~icons/solar/filters-bold-duotone";
import MosaicIcon from "~icons/gis/mosaic";

import type { Action } from "~/types/tools/tools";

const actions: Action[] = [
  {
    title: "SPECTRAL INDICES",
    type: "spectral_indices",
    icon: ImageEnhancementIcon,
    requiredBands: ["RED", "GREEN", "NIR", "SWIR1", "SWIR2"],
    childrens: [
      {
        title: "AFVI",
        type: "afvi",
        icon: ImageEnhancementIcon,
        requiredBands: ["SWIR1", "NIR"],
      },
      {
        title: "BI",
        type: "bi",
        icon: ImageEnhancementIcon,
        requiredBands: ["NIR", "GREEN", "RED"],
      },
      {
        title: "NDVI",
        type: "ndvi",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "NIR"],
      },
      {
        title: "NDWI",
        type: "ndwi",
        icon: ImageEnhancementIcon,
        requiredBands: ["NIR", "GREEN"],
      },
      {
        title: "SAVI",
        type: "savi",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "NIR"],
      },
      {
        title: "UI",
        type: "ui",
        icon: ImageEnhancementIcon,
        requiredBands: ["SWIR2", "NIR"],
      },
    ],
  },
  {
    title: "SPECTRAL PROFILE",
    type: "spectral_profile",
    icon: ImageEnhancementIcon,
    requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
  },
  // todo: make tools here Unready
  // {
  //   title: "Image Enhancement",
  //   type: "-",
  //   icon: ImageEnhancementIcon,
  //   requiredBands: [],
  // },
  // {
  //   title: "Filters",
  //   type: "-",
  //   icon: FiltersIcon,
  //   requiredBands: [],
  // },
  // {
  //   title: "Mosaic",
  //   type: "-",
  //   icon: MosaicIcon,
  //   requiredBands: [],
  // },
];

export { actions };
