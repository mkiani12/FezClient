import ImageEnhancementIcon from "~icons/carbon/edge-enhancement";
import BandIcon from "~icons/material-symbols/document-scanner-outline-rounded";
import BeforeAfterIcon from "~icons/material-symbols/two-pager-rounded";
import TifIcon from "~icons/material-symbols/imagesmode-outline";

import type { ActionList, OperationMode } from "~/types/tools/tools";

// todo odd input and tif mode

const actions: ActionList = {
  bands: [
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
          typeHint: "positive number greater than or equal to 1",
        },
        random_state: {
          title: "Random state",
          type: "Number",
          required: false,
          value: "",
          typeHint: "positive number and 0, also could be None (null)",
        },
      },
    },
    {
      title: "Image Enhancement",
      type: "image_enhancement",
      icon: ImageEnhancementIcon,
      requiredBands: [],
      childrens: [
        {
          title: "Adaptive Image",
          type: "adaptive_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {
            clip_limit: {
              title: "Clip Limit",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Equalize Image",
          type: "equalize_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {
            clip_limit: {
              title: "Clip Limit",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Float Image",
          type: "float_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {},
        },
        {
          title: "Gamma Image",
          type: "gamma_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gamma: {
              title: "Gamma",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
            gain: {
              title: "Gain",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Log Adjust",
          type: "log_adjust",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gain: {
              title: "Gain",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
            inv: {
              title: "Inverse",
              type: "Boolean",
              required: true,
              value: false,
              typeHint: "true or false",
            },
          },
        },
        {
          title: "Orginal Image",
          type: "orginal_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {},
        },
        {
          title: "Sigmodid Image",
          type: "sigmodid",
          icon: ImageEnhancementIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gain: {
              title: "Gain",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
            inv: {
              title: "Inverse",
              type: "Boolean",
              required: true,
              value: false,
              typeHint: "true or false",
            },
            cutoff: {
              title: "Cutoff",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
          },
        },
        {
          title: "RGB Adaptive Image",
          type: "rgb_adaptive_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Equalize Image",
          type: "rgb_equalize_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Gamma Image",
          type: "rgb_gamma_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Image",
          type: "rgb_image",
          icon: ImageEnhancementIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
      ],
    },
    {
      title: "PCA",
      type: "pca",
      icon: ImageEnhancementIcon,
      requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
      extra_param: {},
    },
  ],
  before_after: [],
  tif: [
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
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
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
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
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
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
            },
          },
        },
      ],
    },
  ],
};

const operationModes: OperationMode[] = [
  { title: "Bands", icon: BandIcon, value: "bands" },
  {
    title: "Before & after(bands)",
    icon: BeforeAfterIcon,
    value: "before_after",
  },
  { title: "Single file", icon: TifIcon, value: "tif" },
];

export { actions, operationModes };

/**
 const actions: ActionList = {
  bands: [
    {
      title: 'SPECTRAL INDICES',
      type: 'spectral_indices',
      icon: ImageEnhancementIcon,
      requiredBands: ['RED', 'GREEN', 'NIR', 'SWIR1', 'SWIR2'],
      childrens: [
        {
          title: 'AFVI',
          type: 'afvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['SWIR1', 'NIR'],
        },
        {
          title: 'BI',
          type: 'bi',
          icon: ImageEnhancementIcon,
          requiredBands: ['NIR', 'GREEN', 'RED'],
        },
        {
          title: 'NDVI',
          type: 'ndvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
        {
          title: 'NDWI',
          type: 'ndwi',
          icon: ImageEnhancementIcon,
          requiredBands: ['NIR', 'GREEN'],
        },
        {
          title: 'SAVI',
          type: 'savi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
        {
          title: 'UI',
          type: 'ui',
          icon: ImageEnhancementIcon,
          requiredBands: ['SWIR2', 'NIR'],
        },
        {
          title: 'NDVI',
          type: 'ndvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
      ],
    },
    {
      title: 'SPECTRAL PROFILE',
      type: 'spectral_profile',
      icon: ImageEnhancementIcon,
      requiredBands: ['RED', 'GREEN', 'BLUE', 'NIR', 'SWIR1', 'SWIR2'],
    },
    {
      title: 'Cluster / \n K-means',
      type: 'clustering',
      icon: ImageEnhancementIcon,
      requiredBands: ['NIR'],
      extra_param: {
        n_clusters: {
          title: 'N clusters',
          type: 'Number',
          required: true,
          value: '',
          typeHint: 'positive number greater than or equal to 1',
        },
        random_state: {
          title: 'Random state',
          type: 'Number',
          required: false,
          value: '',
          typeHint: 'positive number and 0, also could be None (null)',
        },
      },
    },
  ],
  'before-after': [],
  tif: [
    {
      title: 'Filters',
      type: 'filters',
      icon: ImageEnhancementIcon,
      requiredBands: [],
      childrens: [
        {
          title: 'Guassian',
          type: 'guassion',
          icon: ImageEnhancementIcon,
          requiredBands: [],
        },
        {
          title: 'Laplacian',
          type: 'laplacian',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
        {
          title: 'Median',
          type: 'median',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
        {
          title: 'Sobel',
          type: 'sobel',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
      ],
    },
  ],
};

 */
