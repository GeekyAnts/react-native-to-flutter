import { getFontStyle } from "../utils/getFontStyle";
import { getFontFamily, getFontWeight, getTextAlign } from "../utils/styled-system";
import { dartType, flutterWidget } from "./flutter-widgets";

export const  textProp = {
 

    color: {
        widget: "Text",
        "property": "color",
        class: flutterWidget.Color,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        }
      },


    fontSize: {
        widget: "Text",
        "property": "fontSize",
        class: dartType.double,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        }
      },

      letterSpacing: {
        widget: "Text",
        "property": "letterSpacing",
        class: dartType.double,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        }
      },

      lineHeight: {
        widget: "Text",
        "property": "lineHeight",
        class: dartType.double,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        }
      },

      fontStyle :{
        
        widget: "Text",
        "property": "fontStyle",
        class: flutterWidget.FontStyle,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        },
        transformer:getFontStyle
      },

      fontWeight :{
        
        widget: "Text",
        "property": "fontWeight",
        class: flutterWidget.FontWeight,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        },
        transformer:getFontWeight
      },

      textAlign :{
        widget:"Text",
        property:"textAlign",
        class : flutterWidget.TextAlign,
        transformer:getTextAlign
      },
      fontFamily : {
        widget: "Text",
        "property": "fontFamily",
        class: flutterWidget.FontFamily,
        "partOf": {
          "class": flutterWidget.TextStyle,
          "property": "style",
        },
        transformer:getFontFamily
      }
}