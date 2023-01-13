
import { flutterWidget } from "../config/flutter-widgets";
import { toCamel } from "./camel";
import { pushPropToWidget } from "./pushPropToWidget";



export const getAlignmentAxis = (styles: any, object: any, ast: any) => {
  
  let layoutWidget: any = { ...flutterWidget.Row };
  //layoutWidget.properties = [];
  if (styles.hasOwnProperty("flexDirection")) {
    if (styles.flexDirection === "column") {

      layoutWidget = { ...flutterWidget.Column };

    }
  }

  if (object.hasOwnProperty("value")) {
    object = { ...object, value: object.value.replace(/flex-/, "") };

    object = { ...object, value: toCamel(object.value) };
    object = { ...object, value: object.value.replace(/-/, "") };
  }


  let index = layoutWidget.properties.findIndex((data: any) => (data.class === object.class));
  if (index > -1) {

    layoutWidget.properties.splice(index, 1);
  }


  if (object.hasOwnProperty("value")) {
    layoutWidget.properties.push(object);
  }

  layoutWidget["namedProp"] = "child";


  pushPropToWidget(ast, layoutWidget, flutterWidget.Container.class);


  object = ast;

  return { nested: true, object };
};
