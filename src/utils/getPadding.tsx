import { dartType } from "../config/layout-props";



export const getPadding = (styles: any, object: any) => {
  object.properties = [];
  
  if (styles.hasOwnProperty("padding")) {

    delete object.properties;
  }
  else {

    object.class = "EdgeInsets.only";
    if (styles.hasOwnProperty("paddingLeft") || styles.hasOwnProperty("paddingHorizontal")) {

      let widget: any = dartType.double;
      widget.value = styles["paddingLeft"] ?? styles["paddingHorizontal"];
      widget = { ...widget, namedProp: "left" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("paddingRight")|| styles.hasOwnProperty("paddingHorizontal")) {

      let widget: any = dartType.double;
      widget.value = styles["paddingRight"]?? styles["paddingHorizontal"];;
      widget = { ...widget, namedProp: "right" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("paddingTop") || styles.hasOwnProperty("paddingVertical")) {

      let widget: any = dartType.double;
      widget.value = styles["paddingTop"] ?? styles["paddingVertical"];;
      widget = { ...widget, namedProp: "top" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("paddingBottom") || styles.hasOwnProperty("paddingVertical")) {

      let widget: any = dartType.double;
      widget.value = styles["paddingBottom"]?? styles["paddingVertical"];
      widget = { ...widget, namedProp: "bottom" };
      object.properties.push(widget);

    }

  }

  return object;
};
