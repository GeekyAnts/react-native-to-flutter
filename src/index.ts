

import { styleSystem } from "./config";
import { flutterWidget } from "./config/flutter-widgets";
import { pushPropToWidget } from "./utils/pushPropToWidget";

import * as babel from '@babel/core';
//@ts-ignore
import xyz from '@babel/preset-react'
import { readReactAttribute } from "./plugin/transformer";
// import { transformer } from "./plugin/transformer";









let mapReactComponentToFlutterWidgets: any = {
  "View": flutterWidget.Container,
  "Text": flutterWidget.Text
};


let count =0;
let dartAST: any = {}













export function buildDartAST(component: any, theme: any) {

debugger
console.log(theme)
  try {
    let widget: any = mapReactComponentToFlutterWidgets[component];
    delete widget.properties;
    widget.properties = []
    dartAST = ''
    dartAST = widget;

    theme = theme;

    clearProperties(theme);

    loopStyle(theme);

  } catch (error) {
    console.error(error)
    return error
  } finally {
    
    createFlutterWidget(dartAST,count)
    
  }



}








function loopStyle(theme: any) {

  Object.entries(theme).map(([k, v]: any) => {



    if (styleSystem.hasOwnProperty(k)) {

      if (styleSystem[k].hasOwnProperty("partOf")) {
        if (dartAST["properties"]) {

          let newVal = { [styleSystem[k].partOf.property]: styleSystem[k].partOf.class };
          let myObject = addProperty(newVal[styleSystem[k].partOf.property], v, k, theme);
          let widget = styleSystem[k].widget;
          if (myObject.nested) {
            dartAST = myObject.object;
          } else {
            pushPropToWidget(dartAST, myObject, widget);
          }


          // if(myObject.nested){
          //   dartAST = myObject.object;
          // }else {
          //   let index = dartAST["properties"].findIndex((data: any) => { return data.class === myObject.class });

          //   if (index < 0) {

          //     dartAST.properties.push(myObject);
          //   }

          // }


        }
      } else {

        let newVal = { ...styleSystem[k].class };
        let myObject = addProperty(newVal, v, k, theme);
        let widget = styleSystem[k].widget;

        if (myObject.nested) {
          dartAST = myObject.object;
        } else {
          pushPropToWidget(dartAST, myObject, widget);
        }


        // if(myObject.nested){
        //   dartAST = myObject.object;
        // }else {
        //   let index = dartAST["properties"].findIndex((data: any) => { return data.namedProp === myObject.namedProp });

        //   if (index < 0) {

        //     dartAST.properties.push(myObject);
        //   }

        // }

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

function addProperty(myObject: any, val: any, prop: any, style: any) {

  let newProp: any;
  if (styleSystem.hasOwnProperty(prop)) {
    if (myObject.type === "constructor" || myObject.type === "enum") {


      newProp = { ...styleSystem[prop].class, namedProp: styleSystem[prop].property }
      if (typeof newProp.value === "object") {
        newProp.value = { ...newProp.value, value: val };
      } else {
        newProp.value = val;
      }


      if (styleSystem[prop].transformer) {

        // newProp.properties = []
        newProp = styleSystem[prop].transformer(style, newProp, dartAST);

        if (newProp.nested) {
          return newProp;
        }
      }




    } else {

      newProp = { ...myObject, value: val, namedProp: styleSystem[prop].property }
    }
  }

  if (newProp.class !== myObject.class) {
    if (styleSystem[prop].hasOwnProperty("partOf")) {

      let index = myObject["properties"].findIndex((data: any) => {


        return data.namedProp === newProp.namedProp;

      });

      if (index < 0) {
        myObject.properties.push(newProp);
      }
    } else {
      myObject = newProp;
    }

  } else {
    myObject = newProp
  }


  return myObject;
}

let code: string = ""
let tab: string = '\t';
// @ts-ignore

export function createFlutterWidget(ast: any, c: number) {

  if (ast.hasOwnProperty("namedProp")) {
    if (ast.type === "constructor") {
      code += `${tab.repeat(c)}${ast.namedProp}:${ast.class}(\n`
    } else if (ast.type === "Array") {
      code += `${tab.repeat(c)}${ast.namedProp}:[\n`
    }

  } else {
    code += `${tab.repeat(c)}${ast.class}(\n`
  }
  c++

  Object.entries(ast.properties).forEach(([, v]: any) => {

    if (v.hasOwnProperty("properties") || v.hasOwnProperty("widgets")) {
      createFlutterWidget(v, c);
      code += `${tab.repeat(c)}),\n`


    } else {


      let innerValue = v;
      let innerKey




      if (innerValue.class) {
        if (innerValue.type === "constructor" || innerValue.type === "enum" || innerValue.type === "string") {
          if (innerValue.hasOwnProperty("properties")) {
            createFlutterWidget(innerValue, c);

          }


          if (innerValue.value.transformer) {
            innerValue.value.value = innerValue.value.transformer(innerValue.value.value)
          } else {
            if (innerValue.transformer) {
              innerValue.value = innerValue.transformer(innerValue.value)
            }
          }
        
          if (innerValue.type === "constructor") {
            // Build class when its constrictor
            /// for eg Color(0xffffffff)

            code += `${tab.repeat(c)}${innerValue.namedProp}:${innerValue.class}(${innerValue.value.value ?? innerValue.value}),\n`
          } else if (innerValue.type === "enum") {
            // Build class when its constrictor
            /// for eg MainAxisAlignment.center
            code += `${tab.repeat(c)}${innerValue.namedProp}:${innerValue.class}.${innerValue.value.value ?? innerValue.value},\n`
          } else if (innerValue.type === "string") {
          
            code += `${tab.repeat(c)}${innerValue.namedProp}: "${innerValue.value.value ?? innerValue.value}", \n`
          }

        }


      } else {
        if (innerValue.type === "nameConstructor") {

          let args: string = ''

          if (innerValue.args) {
            Object.entries(innerValue.args[0]).forEach(([k, v]: any, index: number) => {

              if (index == 0) {
                args += `\n`;
              }


              if (v.transformer) {
                v.value = v.transformer(v.value);
              }




              args += `${tab.repeat(c + 1)}${k}:${v.value},\n`
            })
            code += `${tab.repeat(c)}${innerKey}:${innerValue.callee}.${innerValue.name}(${args}${tab.repeat(c)}),\n`
          } else {
            code += `${tab.repeat(c)}${innerKey}:${innerValue.callee}.${innerValue.name}(\n${innerValue.value}),\n`
          }
        } else {

          if (innerValue.transformer) {

            innerValue.value = innerValue.transformer(innerValue.value ?? innerValue)
          }

          code += `${tab.repeat(c)}${innerValue.namedProp}:${innerValue.value ?? innerValue},\n`
        }


      }



    }

  });

 
}












export const convertNativeBaseThemeToFlutterWidgets = (styles: any): string => {

  



 
  try {
    //let a = buildDartAST(component, styles);

    // if (a.message) {
    //   return code = a.message;
    // } else {
    //   createFlutterWidget(a, count)
    // }

    code = '';
  let out = babel.transform(styles, 
      { 
        ast:true,
        presets:[xyz],
        plugins: [readReactAttribute], 
  
      }
    );
    console.log(out);
    code += ');\n'
    //console.log(a)

    
  } catch (error) {
    code = error as string
  }


  return code;
}
