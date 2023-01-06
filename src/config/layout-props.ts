import { getAlignmentAxis } from "../utils/getAlignmentAxis"
import { getBorder } from "../utils/getBorder"
import { getBorderRadius } from "../utils/getBorderRadius"
import { getExpanded } from "../utils/getExpanded"
import { getMargin } from "../utils/getMargin"
import { getPadding } from "../utils/getPadding"
import { getPositioned } from "../utils/getPositioned"
import { toDouble, toInt } from "../utils/converter"
import { flutterWidget } from "./flutter-widgets"


export const dartType = {
    double: {
      type: "double",
      transformer: toDouble,
      value: "",
    },
    int: {
      type: "int",
      transformer: toInt,
      value: ""
    },
  
  } as const 
  

export const layoutProps  = {


    "minHeight": {
      widget: "Container",
      "property": "minHeight",
      class: dartType.double,
      "partOf": {
        "class": flutterWidget.BoxConstraints,
        "property": "constraints",
      }
    },
  
    "minWidth": {
      widget: "Container",
      "property": "minWidth",
      class: dartType.double,
      "partOf": {
        "class": flutterWidget.BoxConstraints,
        "property": "constraints",
      }
    },
  
    "maxHeight": {
      widget: "Container",
      "property": "maxHeight",
      class: dartType.double,
      "partOf": {
        "class": flutterWidget.BoxConstraints,
        "property": "constraints",
      }
    },
  
    "maxWidth": {
      widget: "Container",
      "property": "maxWidth",
      class: dartType.double,
      "partOf": {
        "class": flutterWidget.BoxConstraints,
        "property": "constraints",
      }
    },
  
    "width": {
      "widget": "Container",
      "property": "width",
      class: dartType.double
  
    },
  
  
    "height": {
      "widget": "Container",
      "property": "height",
      class: dartType.double
    },
  
    "backgroundColor": {
      "widget": "Container",
      "property": "color",
      class: flutterWidget.Color,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      }
    },
  
    "borderRadius": {
      "widget": "Container",
      "property": "borderRadius",
      class: flutterWidget.BorderRadius,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorderRadius
    },
  
    "borderTopLeftRadius": {
      "widget": "Container",
      "property": "borderRadius",
      class: flutterWidget.BorderTopLeftRadius,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorderRadius
    },
  
    "borderTopRightRadius": {
      "widget": "Container",
      "property": "borderRadius",
      class: flutterWidget.BorderTopLeftRadius,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorderRadius
    },
  
    "borderBottomLeftRadius": {
      "widget": "Container",
      "property": "borderRadius",
      class: flutterWidget.BorderBottomLeftRadius,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorderRadius
    },
  
    
    borderWidth: {
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
  
      transformer: getBorder,
    },
  
  
    borderStartWidth: {
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
  
      transformer: getBorder,
    },
  
    borderEndWidth: {
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
  
      transformer: getBorder,
    },
  
    borderBottomWidth :{
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorder,
    },
  
    borderTopWidth :{
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorder,
    },
  
    borderRightWidth :{
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorder,
    },
  
    borderLeftWidth :{
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorder,
    },
  
    borderColor: {
      "widget": "Container",
      "property": "border",
      class: flutterWidget.Border,
      "partOf": {
        "class": flutterWidget.BoxDecoration,
        "property": "decoration",
      },
      transformer: getBorder,
    },
  
    "padding": {
      "widget": "Container",
      "property": "padding",
      class: flutterWidget.EdgeInsets,
      transformer: getPadding,
  
    },
    paddingLeft: {
      "widget": "Container",
      "property": "padding",
      class: flutterWidget.EdgeInsets,
      transformer: getPadding,
    },
  
    paddingRight: {
      "widget": "Container",
      "property": "padding",
      class: flutterWidget.EdgeInsets,
      transformer: getPadding,
    },
  
    paddingTop: {
      "widget": "Container",
      "property": "padding",
      class: flutterWidget.EdgeInsets,
      transformer: getPadding,
    },
  
    paddingBottom: {
      "widget": "Container",
      "property": "padding",
      class: flutterWidget.EdgeInsets,
      transformer: getPadding,
    },
  
    margin: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    marginLeft: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
  
    marginStart: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsetsDirectional,
      transformer: getMargin,
    },
    marginEnd: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsetsDirectional,
      transformer: getMargin,
    },
  
    marginRight: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    marginTop: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    marginBottom: {
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    marginHorizontal :{
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    marginVertical :{
      "widget": "Container",
      "property": "margin",
      class: flutterWidget.EdgeInsets,
      transformer: getMargin,
    },
  
    alignContent:{
      widget:"Column",
      "property": "mainAxisAlignment",
      class : flutterWidget.MainAxisAlignment,
      transformer : getAlignmentAxis
    },

    flexDirection:{
      widget:"Row",
      class : flutterWidget.Row,
      transformer : getAlignmentAxis
    },
  
    alignItems :{
      widget:"Column",
      "property": "crossAxisAlignment",
      class : flutterWidget.CrossAxisAlignment,
      transformer : getAlignmentAxis
    },
  
  justifyContent :{
      widget:"Column",
      "property": "mainAxisAlignment",
      class : flutterWidget.MainAxisAlignment,
      transformer : getAlignmentAxis
    },
  
    
  
  position :{
    widget:"Positioned",
    class: flutterWidget.Positioned,
    transformer : getPositioned
  },
  
  flexGrow:{
    widget:"Expanded",
    class:flutterWidget.Expanded,
    transformer:getExpanded,
  },
  
  flex:{
    widget:"Flex",
    class: flutterWidget.Expanded,
    transformer:getExpanded
  },
  
  top:{
    widget:"Positioned",
    property:"top",
    class:dartType.double,
  },
  
  bottom:{
    widget:"Positioned",
    property:"bottom",
    class:dartType.double,
  },
  
  right:{
    widget:"Positioned",
    property:"right",
    class:dartType.double,
  },
  
  left:{
    widget:"Positioned",
    property:"left",
    class:dartType.double,
  },
  
  
    "boxShadow": {
      "widget": "Container",
      "property": "boxShadow",
      "partOf": {
        "class": "BoxDecoration",
        "property": "decoration",
  
      }
    },
  
  
  
  
    "fontSize": {
      "widget": "Text",
      "property": "fontSize",
      "partOf": {
        "class": "TextStyle",
        "property": "style"
      }
    }
  }
  