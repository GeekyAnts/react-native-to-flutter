import { getBorder, getBorderRadius, getColor, getPadding, toDouble } from "./utils/styled-system";


let dartType = {
  double: {
    type: "double",
    transformer:toDouble,
    value: "",
  },
  Color: {
    type: "constructor",
    class: "Color",
    transformer:getColor,
    value: ""

  },
}

let flutterWidget = {
  Container: {
    type: "constructor",
    class: "Container",
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
    transformer:getColor,
    value: ""

  },
  BoxConstraint: {
    type: "constructor",
    namedProp: "constraint",
    class: "BoxConstraint",
    properties: []
  },



  EdgeInsets: {
    type: "nameConstructor",
    name: "only",
    args: [
      {
        left: dartType.double,
        right: dartType.double,
        top: dartType.double,
        bottom: dartType.double,
      }
    ],
    callee: "EdgeInsets",
    value: dartType.double,
    
  },

  Border:{
    type: "nameConstructor",
    name: "all",
    args: [
      {
        width: dartType.double,
        
       
      }
    ],
    callee: "Border",

  },

  BorderRadius:{
    type: "nameConstructor",
    name: "only",
    args: [
      {
        bottomLeft: dartType.double,
        bottomRight: dartType.double,
        topLeft: dartType.double,
        topRight: dartType.double,
      }
    ],
    callee: "BorderRadius",
    value: dartType.double,
  }
} as const








let mapReactComponentToFlutterWidgets: any = {
  "View": flutterWidget.Container
};


let styleSystem: any = {


  "minHeight": {
    widget: "Container",
    "property": "minHeight",
    class: dartType.double,
    "partOf": {
      "class": flutterWidget.BoxConstraint,
      "property": "constraint",
    }
  },
  "maxHeight": {
    widget: "Container",
    "property": "maxHeight",
    class: dartType.double,
    "partOf": {
      "class": flutterWidget.BoxConstraint,
      "property": "constraint",
    }
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
    transformer:getBorderRadius
  },
  borderWidth:{
    "widget": "Container",
    "property": "border",
    class : flutterWidget.Border,
    "partOf": {
      "class": flutterWidget.BoxDecoration,
      "property": "decoration",
    },

    transformer:getBorder,
  },

  "padding": {
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

  

  "boxShadow": {
    "widget": "Container",
    "property": "boxShadow",
    "partOf": {
      "class": "BoxDecoration",
      "property": "decoration",

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

  "fontSize": {
    "widget": "Text",
    "property": "fontSize",
    "partOf": {
      "class": "TextStyle",
      "property": "style"
    }
  }
}

let dartAST: any = {}
function buildDartAST(component: any, theme: any) {
 
  
try {
  let widget: any = mapReactComponentToFlutterWidgets[component];
  delete widget.properties;
  widget.properties=[]
  dartAST =''
  dartAST = widget;
  theme = JSON.parse(theme);
  clearProperties(theme);
  loopStyle(theme);
} catch (error) {
  return error
}
  return dartAST


}


function loopStyle(theme: any) {
  Object.entries(theme).map(([k, v]: any) => {


    if (styleSystem.hasOwnProperty(k)) {
      if (styleSystem[k].hasOwnProperty("partOf")) {
        if (dartAST["properties"]) {

          let newVal = { [styleSystem[k].partOf.property]: styleSystem[k].partOf.class };
          let myObject = addProperty(newVal[styleSystem[k].partOf.property], v, k, theme);
          let index = dartAST["properties"].findIndex((data: any) => data.class === myObject.class);
          if (index < 0) {

            dartAST.properties.push(myObject);
          }


        }
      } else {


        let newVal = { [styleSystem[k].property]: styleSystem[k].class };

        let myObject = addProperty(newVal[styleSystem[k].property], v, k, theme);



        dartAST.properties.push(myObject);


      }
    }

  });
}

function clearProperties(theme: any) {
  Object.entries(theme).map(([k,]: any) => {
    if (styleSystem.hasOwnProperty(k)) {
      if (styleSystem[k].hasOwnProperty("partOf")) {
        styleSystem[k].partOf.class.properties = [];
      }
    }
  });
}

function addProperty(myObject: any, val: any, prop: any,style:any) {
  let newProp: any;
  
  




  if (styleSystem.hasOwnProperty(prop)) {
    if (myObject.type === "constructor") {
      newProp = { [styleSystem[prop].property]: styleSystem[prop].class }
      newProp[styleSystem[prop].property] = { ...newProp[styleSystem[prop].property], value: val };

      if(newProp[styleSystem[prop].property].type ==="nameConstructor"){
         addProperty(newProp[styleSystem[prop].property],val,prop,style)
      }
      
    } else if (myObject.type === "nameConstructor") {
     debugger
      myObject = styleSystem[prop].transformer(style, myObject);

      newProp = { [styleSystem[prop].property]: myObject }

    } else {
      
      newProp = { [styleSystem[prop].property]: {...myObject,value:val} }
    }
  }
  if (myObject.properties) {
    myObject.properties.push(newProp);
  } else {
    myObject = newProp
  }


  return myObject;
}

let code: string = ""
let tab: string = '\t';
let count: number = 0;
function createFlutterWidget(ast: any, c: number) {

  if (ast.hasOwnProperty("namedProp")) {
    code += `${tab.repeat(c)}${ast.namedProp}:${ast.class}(\n`
  } else {
    code += `${tab.repeat(c)}${ast.class}(\n`
  }
  c++

  Object.entries(ast.properties).forEach(([k, v]: any) => {

    if (v.hasOwnProperty("properties")) {
      createFlutterWidget(v, c);
      code += `${tab.repeat(c)}),\n`


    } else {
      Object.entries(v).forEach(([innerKey, innerValue]: any) => {

        console.log(innerKey, innerValue)

        if (innerValue.class) {

          if (innerValue.type === "constructor") {
           

            if(innerValue.transformer){
              innerValue.value = innerValue.transformer(innerValue.value)
            }
            code += `${tab.repeat(c)}${innerKey}:${innerValue.class}(${innerValue.value}),\n`
          }


        } else {
          if (innerValue.type === "nameConstructor") {

            let args: string = ''

            if (innerValue.args) {
              Object.entries(innerValue.args[0]).forEach(([k, v]: any, index: number) => {

                if (index == 0) {
                  args += `\n`;
                } 
                debugger

                if(v.transformer){
                  v.value = v.transformer(v.value);
                }

               
              
                console.log(k, v);
                args += `${tab.repeat(c + 1)}${k}:${v.value},\n`
              })
              code += `${tab.repeat(c)}${innerKey}:${innerValue.callee}.${innerValue.name}(${args}${tab.repeat(c)}),\n`
            } else {
              code += `${tab.repeat(c)}${innerKey}:${innerValue.callee}.${innerValue.name}(\n${innerValue.value}),\n`
            }
          } else {
            if(innerValue.transformer){
             
              innerValue.value = innerValue.transformer(innerValue.value??innerValue)
            }
            
            code += `${tab.repeat(c)}${innerKey}:${innerValue.value ?? innerValue},\n`
          }


        }

      })

    }
    console.log(k)
  });

  console.log(code)
}












export const convertNativeBaseThemeToFlutterWidgets = (styles:any): string => {
  code='';
  try {
    let a = buildDartAST("View", styles);
    
    if(a.message){
      return code = a.message;
    } else {
      createFlutterWidget(a,count)
    }
  


  console.log(a)

  code += ');\n'
  } catch (error) {
    code = error as string
  }
  

  return code;
}
