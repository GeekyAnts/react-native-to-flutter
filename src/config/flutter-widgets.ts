import { getColor, toDouble, toInt } from "../utils/styled-system";



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

}

export const flutterWidget = {
    Container: {
      type: "constructor",
      class: "Container",
      properties: []
    },

    Text: {
        type: "constructor",
        class: "Text",
        properties: []
      },
  
    MainAxisAlignment :{
      type:"enum",
      class : "MainAxisAlignment",
      value : "",
  
    },

 

  
    Flex :{
      type:"constructor",
      class:"Flex",
      properties:[]
    },
  
    CrossAxisAlignment :{
      type:"enum",
      class : "CrossAxisAlignment",
      value : "",
  
    },
  
    Column :{
      type: "constructor",
      class: "Column",
      properties: []
    },
  
  
    Row :{
      type: "constructor",
      class: "Row",
      properties: []
    },
    Positioned:{
      type: "constructor",
      class: "Positioned",
      properties: []
    },
  
    BoxDecoration: {
      type: "constructor",
      class: "BoxDecoration",
      namedProp: "decoration",
      properties: []
    },
  
    Color: {
      type: "constructor",
      class: "Color",
      namedProp: "color",
      value: dartType.int,
      transformer: getColor
  
    },
    BoxConstraints: {
      type: "constructor",
      namedProp: "constraints",
      class: "BoxConstraints",
      properties: []
    },
  
  
    Expanded:{
      type:"constructor",
      class:"Expanded",
      value:dartType.double,
      properties: []
    },
  
  
  
  
  
    EdgeInsets: {
      type: "constructor",
      class: "EdgeInsets.all",
      properties: [],
      value: dartType.double,
    },
  
    EdgeInsetsDirectional: {
      type: "constructor",
      class: "EdgeInsetsDirectional.all",
      properties: [],
      value: dartType.double,
    },
  
    RadiusCircular: {
      type: "constructor",
      class: "Radius.circular",
      value: dartType.double
    },
  
  
    BorderBottomWidth: {
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
  
    BorderStartWidth:{
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
  
    BorderEndWidth:{
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
  
    BorderTopWidth: {
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
    
    BorderLeftWidth: {
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
  
    BorderRightWidth: {
      type: "constructor",
      class: "BorderSide",
      properties: [
  
      ],
      value: dartType.double,
    },
  
    Border: {
      type: "constructor",
      class: "Border.all",
      properties: [
  
      ],
      value: dartType.double,
      callee: "Border",
  
    },
  
  
  
    BorderRadius: {
      type: "constructor",
      class: "BorderRadius.circular",
      namedProp: "borderRadius",
      properties: [
  
      ],
      value: dartType.double,
    },
  
  
  
    BorderTopLeftRadius: {
      type: "constructor",
      class: "BorderRadius.only",
      properties: [
  
      ],
      value: dartType.double,
    },
    
  
  
  
    
  
    BorderBottomLeftRadius: {
      type: "constructor",
      class: "BorderRadius.only",
      properties: [
  
      ],
      value: dartType.double,
    },


    TextStyle :{
      type:"constructor",
      class:"TextStyle",
      namedProp:"style",
      properties: [
  
      ],
    },

    FontStyle:{
      type:"enum",
      class : "FontStyle",
      value : "",
    },
    FontWeight:{
      type:"enum",
      class : "FontWeight",
      value : "",
    },
    TextAlign :{
      type:"enum",
      class:"TextAlign",
      value:""
    },

    FontFamily :{
      type:"string",
      class:"FontFamily",
      value:""
    }
  } as const
  