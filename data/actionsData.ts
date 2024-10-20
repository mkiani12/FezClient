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
      {
        title: "NDVI",
        type: "ndvi",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "NIR"],
      },
    ],
  },
  {
    title: "SPECTRAL PROFILE",
    type: "spectral_profile",
    icon: ImageEnhancementIcon,
    requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
  },
  {
    title: "HSV",
    type: "hsv",
    icon: ImageEnhancementIcon,
    requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
    childrens: [
      {
        title: "HSV",
        type: "hsv",
        icon: ImageEnhancementIcon,
        requiredBands: ["GREEN", "BLUE", "NIR"],
      },
      {
        title: "IRHSV",
        type: "irhsv",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "SWIR1", "SWIR2"],
      },
      {
        title: "HUE",
        type: "hue",
        icon: ImageEnhancementIcon,
        requiredBands: ["GREEN", "BLUE", "NIR"],
      },
      {
        title: "IRHUE",
        type: "irhue",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "SWIR1", "SWIR2"],
      },
      {
        title: "SATURATION",
        type: "saturation",
        icon: ImageEnhancementIcon,
        requiredBands: ["GREEN", "BLUE", "NIR"],
      },
      {
        title: "VALUE",
        type: "valuehsv",
        icon: ImageEnhancementIcon,
        requiredBands: ["GREEN", "BLUE", "NIR"],
      },
      {
        title: "VALUEIR",
        type: "valueirhsv",
        icon: ImageEnhancementIcon,
        requiredBands: ["RED", "SWIR1", "SWIR2"],
      },
    ],
  },
  {
    title: "Cluster / \n K-means",
    type: "clustering",
    icon: ImageEnhancementIcon,
    requiredBands: ["NIR"],
    extra_param: {
      n_clusters: {
        title: "N clusters",
        type: "Number",
        required: true,
        value: "",
      },
      random_state: {
        title: "Random state",
        type: "Number",
        required: true,
        value: "",
      },
    },
  },
  // todo odd input and tif mode
  {
    title: "Filters",
    type: "filters",
    icon: ImageEnhancementIcon,
    requiredBands: [],
    childrens: [
      {
        title: "Guassian",
        type: "guassion",
        icon: ImageEnhancementIcon,
        requiredBands: [],
      },
      {
        title: "Laplacian",
        type: "laplacian",
        icon: ImageEnhancementIcon,
        requiredBands: [],
        extra_param: {
          kernel_size: {
            title: "Kernel size",
            type: "Number",
            required: true,
            value: "",
          },
        },
      },
      {
        title: "Median",
        type: "median",
        icon: ImageEnhancementIcon,
        requiredBands: [],
        extra_param: {
          kernel_size: {
            title: "Kernel size",
            type: "Number",
            required: true,
            value: "",
          },
        },
      },
      {
        title: "Sobel",
        type: "sobel",
        icon: ImageEnhancementIcon,
        requiredBands: [],
        extra_param: {
          kernel_size: {
            title: "Kernel size",
            type: "Number",
            required: true,
            value: "",
          },
        },
      },
    ],
  },
];

export { actions };
