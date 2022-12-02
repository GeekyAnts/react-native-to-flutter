import { dartType } from "..";



export const getMargin = (styles: any, object: any) => {
  object.properties = [];
  if (styles.hasOwnProperty("margin")) {

    delete object.properties;
  }
  else {

    object.class = "EdgeInsets.only";
    if (styles.hasOwnProperty("marginLeft")) {

      let widget: any = dartType.double;
      widget.value = styles["marginLeft"];
      widget = { ...widget, namedProp: "left" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginRight")) {

      let widget: any = dartType.double;
      widget.value = styles["marginRight"];
      widget = { ...widget, namedProp: "right" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginTop")) {

      let widget: any = dartType.double;
      widget.value = styles["marginTop"];
      widget = { ...widget, namedProp: "top" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginBottom")) {

      let widget: any = dartType.double;
      widget.value = styles["marginBottom"];
      widget = { ...widget, namedProp: "bottom" };
      object.properties.push(widget);

    }

  }

  return object;
};
