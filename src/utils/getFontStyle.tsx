





export const getFontStyle = (styles: any, object: any) => {
  switch (styles.fontStyle) {
    case "italic":
      object.value = "italic";
      break;
    case "normal":
      object.value = "normal";

      break;
    default:
      object.value = "normal";

      break;
  }

  return object;
};
