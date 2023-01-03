





export const getFontStyle = (styles: any, object: any) => {
  switch (styles.fontStyle) {
    case "italic":
      object = {...object,value:"italic"}
     
      break;
    case "normal":
      object = {...object,value:"normal"}
     

      break;
    default:
      object = {...object,value:"normal"}
     

      break;
  }

  return object;
};
