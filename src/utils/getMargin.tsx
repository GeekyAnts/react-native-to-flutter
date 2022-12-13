import { dartType } from "../config/layout-props";




export const getMargin = (styles: any, object: any) => {
  object.properties = [];
  debugger;
  if (styles.hasOwnProperty("margin")) {

    delete object.properties;
  } else if(styles.marginStart || styles.marginEnd){
    object.class = "EdgeInsetsDirectional.only";
    if (styles.hasOwnProperty("marginStart")) {

      let widget: any = dartType.double;
      widget.value = styles["marginStart"];
      widget = { ...widget, namedProp: "start" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginEnd")) {

      let widget: any = dartType.double;
      widget.value = styles["marginEnd"];
      widget = { ...widget, namedProp: "end" };
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
  else {

   
    object.class = "EdgeInsets.only";
    if (styles.hasOwnProperty("marginLeft") || styles.marginHorizontal) {

      let widget: any = dartType.double;
      widget.value = styles["marginLeft"] ?? styles.marginHorizontal;
      widget = { ...widget, namedProp: "left" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginRight") || styles.marginHorizontal) {

      let widget: any = dartType.double;
      widget.value = styles["marginRight"] ?? styles.marginHorizontal;
      widget = { ...widget, namedProp: "right" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginTop") || styles.marginVertical) {

      let widget: any = dartType.double;
      widget.value = styles["marginTop"] ?? styles.marginVertical;
      widget = { ...widget, namedProp: "top" };
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("marginBottom") || styles.marginVertical) {

      let widget: any = dartType.double;
      widget.value = styles["marginBottom"] ?? styles.marginVertical;
      widget = { ...widget, namedProp: "bottom" };
      object.properties.push(widget);

    }

  }

  return object;
};
