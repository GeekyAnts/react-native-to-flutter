import { flutterWidget } from "../config/flutter-widgets";
import { dartType } from "../config/layout-props";



export const getExpanded = (styles: any, object: any, ast?: any) => {
  let widget: any = {};
  if (styles.hasOwnProperty("flexGrow")) {

    widget = {...flutterWidget.Expanded};
    widget.properties = [];
    let flex: any = {};
    flex = dartType.int;
    flex = { ...flex, value: styles.flexGrow };
    flex["namedProp"] = "flex";

    let index = widget.properties.findIndex((data: any) => (data.class === widget.class));
    if (index)
      if (index > -1) {

        widget.properties.splice(index, 1);
      }
    widget.properties.push(flex);
    console.log(object);
    console.log(ast);
    if (ast.class === "Container") {
      delete widget.namedProp;
      //ast = widget;
      widget.properties.push({namedProp:"child",...ast})
      object = widget;
      return { nested: true, object };
    } else {
      searchForContainer(ast);
    }

    ast.properties = [];
    ast.properties.push(widget);

    object = ast;
    return { nested: true, object };

  } else {
    return object;
  }

  function searchForContainer(_ast: any) {
    if (_ast.properties) {
      Object.entries(_ast.properties).forEach(([, v]: any) => {

        if (v.class === "Container") {
          widget["namedProp"] = "child";
          widget.properties.push(v);
        } else {
          searchForContainer(v);
        }
      });
    }

  }
};
