import {
  swatch,
  fileIcon,
  logoCan,
  stylishCan,
} from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  }
];

export const FilterTabs = [
  {
    name: "logoCan",
    icon: logoCan,
  },
  {
    name: "stylishCan",
    icon: stylishCan,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoCan",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishCan",
  },
};
