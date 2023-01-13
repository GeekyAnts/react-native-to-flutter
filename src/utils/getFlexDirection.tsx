import { flutterWidget } from "../config/flutter-widgets";
import { pushPropToWidget } from "./pushPropToWidget";

export const getFlexDirection = (styles: any, object: any={}, ast: any) => {

    let layoutWidget: any = { ...flutterWidget.Row };
    layoutWidget.properties = [];
    if (styles.hasOwnProperty("flexDirection")) {
        if (styles.flexDirection === "column") {

            layoutWidget = { ...flutterWidget.Column };

        }
    }
    
    let index = layoutWidget.properties.findIndex((data: any) => (data.class === object.class));
    if (index > -1) {

        layoutWidget.properties.splice(index, 1);
    }



    layoutWidget.properties.push(object);


    layoutWidget["namedProp"] = "child";

    let rowOrColIndex = ast.properties.findIndex((data: any) => (data.class === "Row" || data.class === "Column"));
    console.log(rowOrColIndex);

    pushPropToWidget(ast, layoutWidget, flutterWidget.Container.class);


    object = ast;

    return { nested: true, object };
}      
