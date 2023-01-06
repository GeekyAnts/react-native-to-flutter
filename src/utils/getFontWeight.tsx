import { isNumerical } from "./unit";



export const getFontWeight = (styles: any, object: any) => {

  if (isNumerical(styles.fontWeight)) {
    object.value = 'w' + styles.fontWeight;
  } else {
    object.value = styles.fontWeight;
  }
  return object;
};
