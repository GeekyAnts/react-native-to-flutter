import { dartType, flutterWidget } from "..";



export const getBorder = (styles: any, object: any) => {

  object.properties = [];
  if (styles.hasOwnProperty("borderWidth")) {


    let widget: any = dartType.double;
    widget.value = styles["borderWidth"];
    widget = { ...widget, namedProp: "width" };
    object.properties.push(widget);

    if (styles.hasOwnProperty("borderColor")) {
      let widget: any = flutterWidget.Color;
      widget.value = styles["borderColor"];
      object.properties.push(widget);
    }

  }

  else if (styles.borderEndWidth || styles.borderStartWidth) {
    debugger;
    object.properties = [];
    if (styles.hasOwnProperty("borderEndWidth")) {

      object.class = "BorderDirectional";
      let widget: any = flutterWidget.BorderEndWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "end" };
      let prop: any = dartType.double;
      prop.value = styles["borderEndWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderStartWidth")) {

      object.class = "BorderDirectional";
      let widget: any = flutterWidget.BorderStartWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "start" };
      let prop: any = dartType.double;
      prop.value = styles["borderStartWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderTopWidth")) {


      object.class = "BorderDirectional";
      let widget: any = flutterWidget.BorderTopWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "top" };
      let prop: any = dartType.double;
      prop.value = styles["borderTopWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderBottomWidth")) {


      object.class = "BorderDirectional";
      let widget: any = flutterWidget.BorderBottomWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "bottom" };
      let prop: any = dartType.double;
      prop.value = styles["borderBottomWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

  } else {

    if (styles.hasOwnProperty("borderBottomWidth")) {

      object.properties = [];
      object.class = "Border";
      let widget: any = flutterWidget.BorderBottomWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "bottom" };
      let prop: any = dartType.double;
      prop.value = styles["borderBottomWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderTopWidth")) {


      object.class = "Border";
      let widget: any = flutterWidget.BorderBottomWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "top" };
      let prop: any = dartType.double;
      prop.value = styles["borderTopWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderLeftWidth")) {


      object.class = "Border";
      let widget: any = flutterWidget.BorderBottomWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "left" };
      let prop: any = dartType.double;
      prop.value = styles["borderLeftWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }

    if (styles.hasOwnProperty("borderRightWidth")) {


      object.class = "Border";
      let widget: any = flutterWidget.BorderBottomWidth;
      widget.properties = [];
      widget = { ...widget, namedProp: "right" };
      let prop: any = dartType.double;
      prop.value = styles["borderRightWidth"];
      prop = { ...prop, namedProp: "width" };

      if (styles.hasOwnProperty("borderColor")) {
        let color: any = flutterWidget.Color;
        color.value = styles["borderColor"];
        widget.properties.push(color);
      }
      widget.properties.push(prop);
      object.properties.push(widget);
    }
  }








  return object;
};
