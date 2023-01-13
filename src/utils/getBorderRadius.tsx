import { flutterWidget } from "../config/flutter-widgets";




export const getBorderRadius = (styles: any, object: any) => {

  object.properties = [];

  if (styles.hasOwnProperty("borderRadius")) {

    delete object.properties;
  } else if (styles.hasOwnProperty("borderEndWidth") || styles.hasOwnProperty("borderEndWidth")) {
  } else {
   
    if (styles.hasOwnProperty("borderTopLeftRadius")) {
      let widget: any = {...flutterWidget.RadiusCircular};
      widget = { ...widget, namedProp: "topLeft",value:{value:styles["borderTopLeftRadius"]} };
     
      object.properties.push(widget);

    }
    if (styles.hasOwnProperty("borderTopRightRadius")) {

      let widget: any = flutterWidget.RadiusCircular;
      //widget.value.value = styles["borderTopRightRadius"];
      
      widget = { ...widget, namedProp: "topRight",value:{value:styles["borderTopRightRadius"],...widget.value} };
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderBottomRightRadius")) {
      let widget: any = flutterWidget.RadiusCircular;
      widget.value.value = styles["borderBottomRightRadius"];
      widget["namedProp"] = "bottomRight";
      object.properties.push(widget);

    }

    if (styles.hasOwnProperty("borderBottomLeftRadius")) {

      let widget: any = flutterWidget.RadiusCircular;
      widget.value.value = styles["borderBottomLeftRadius"];
      widget = { ...widget, namedProp: "bottomLeft" };
      object.properties.push(widget);
    }
  }


  return object;
};
