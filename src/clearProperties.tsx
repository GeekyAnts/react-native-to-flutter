import { styleSystem } from "./config";

export function clearProperties(theme: any) {
  Object.entries(theme).map(([k,]: any) => {
    if (styleSystem.hasOwnProperty(k)) {
      if (styleSystem[k].hasOwnProperty("partOf")) {
        styleSystem[k].partOf.class.properties = [];
      }
    }
  });
}
