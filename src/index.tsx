

import { styleSystem } from "./config";
import { flutterWidget } from "./config/flutter-widgets";
import { pushPropToWidget } from "./utils/pushPropToWidget";

import * as parser from '@babel/parser';
//@ts-ignore
import xyz from '@babel/preset-react'
import { buildDartASTfromAST, searchForDeepChildAndPush } from "./buildDartASTfromAST";
import { addProperty } from "./addProperty";
import { clearProperties } from "./clearProperties";



let mapReactComponentToFlutterWidgets: any = {
  "View": flutterWidget.Container,
  "Text": flutterWidget.Text
};


let count = 0;


export function buildDartAST(component: any, theme: any) {

  let dartAST: any = {}

  try {
    let widget: any = { ...mapReactComponentToFlutterWidgets[component] };
    
    // delete widget.properties;
    widget.properties = []
    let a = ''
    a = widget;

    clearProperties(theme);

    dartAST = loopStyle(theme, a);


  } catch (error) {
    console.error(error)
    return error
  } finally {
    return dartAST;
    // createFlutterWidget(dartAST,count)

  }



}


function loopStyle(theme: any, ast: any) {
  

  Object.entries(theme).map(([k, v]: any) => {



    if (styleSystem.hasOwnProperty(k)) {

      if (styleSystem[k].hasOwnProperty("partOf")) {
        if (ast["properties"]) {

          let newVal = { [styleSystem[k].partOf.property]: styleSystem[k].partOf.class };
          let myObject = addProperty(newVal[styleSystem[k].partOf.property], v, k, theme, ast);
          let widget = styleSystem[k].widget;
          if (myObject.nested) {
            ast = myObject.object;
          } else {
            pushPropToWidget(ast, myObject, widget);
          }
        }
      } else {
        
        let newVal = { ...styleSystem[k].class };
        let myObject = addProperty(newVal, v, k, theme, ast);
        let widget = styleSystem[k].widget;

        if (myObject.nested) {
          ast = myObject.object;
        } else {
          pushPropToWidget(ast, myObject, widget);
        }


      }
    }

  });

  return ast;
}

let code: string = ""
let tab: string = '\t';
// @ts-ignore

export function createFlutterWidget(ast: any, c: number) {

  if (ast?.hasOwnProperty("namedProp")) {
    if (ast.type === "constructor") {
      if (ast.hasOwnProperty("value")) {

        code += `${tab.repeat(c)}${ast.namedProp}:${ast.class}('${ast.value}',\n`
      } else {
        code += `${tab.repeat(c)}${ast.namedProp}:${ast.class}(\n`
      }

    } else if (ast.type === "Array") {
      code += `${tab.repeat(c)}${ast.namedProp}:[\n`
    }

  } else {

    if (ast?.hasOwnProperty("value")) {

      code += `${tab.repeat(c)}${ast.class}('${ast.value}',\n`
    } else {

      code += `${tab.repeat(c)}${ast?.class}(\n`
    }

  }
  c++
  if (ast?.hasOwnProperty("properties")) {
    Object.entries(ast?.properties).forEach(([, v]: any) => {
      
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
          } else if (innerValue.type == "Array") {

            code += `${tab.repeat(c)}${innerValue.namedProp}:[\n`
            c++;
            Object.entries(innerValue.values).forEach(([, v]: any) => {

              createFlutterWidget(v, c);
              code += `${tab.repeat(c)}),\n`
            });
            c--;
            code += `${tab.repeat(c)}],\n`
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



}












export const convertNativeBaseThemeToFlutterWidgets = (styles: any): string => {






  try {

    let ast: any;
    code = '';

    try {
      ast = parser.parse(styles, {
        plugins: [
          // enable jsx and flow syntax
          "jsx",
          "flow",
        ],
      });
      console.log(ast);

      let style: any = {};
      let myDartAST: any;
      let expression = ast.program.body[0].expression;
      let name = expression.openingElement.name.name;

      if (expression.type === "JSXElement") {

        let attributes = expression.openingElement.attributes[0];
        if (attributes) {
          if (attributes?.name?.name === "style") {

            let properties = attributes.value.expression.properties;
            Object.entries(properties).forEach(([, v]: any) => {
              style[v.key.name] = v.value.value
            });
            myDartAST = buildDartAST(name, style)
            let layout: any = {
              type: "constructor",
              properties: []
            }

            console.log(myDartAST);
            
            if (name === "View") {
              debugger;
              let index = myDartAST.properties.findIndex((data: any) => (data.class === "Row" || data.class === "Column"));
              if (index > -1) {
               
                layout = {...layout,"class": myDartAST.properties[index].class}
                myDartAST.properties.splice(index, 1);
              } else {
                layout = {...layout,"class": "Row"}
              }
             
             // myDartAST.properties.push({ ...layout, "namedProp": "child" })
             
              searchForDeepChildAndPush(myDartAST,{...layout,"namedProp": "child" });
            }


          }
        } else {
          myDartAST = buildDartAST(name, style)
          let layout: any = {
            type: "constructor",
            properties: []
          }

          if (name === "View") {
            let index = myDartAST.properties.findIndex((data: any) => (data.class === "Row" || data.class === "Column"));
            if (index > -1) {
              layout = {...layout,"class": myDartAST.properties[index].class}
              myDartAST.properties.splice(index, 1);
            } else {
              layout = {...layout,"class": "Row"}
            }

           //searchForDeepChildAndPush(myDartAST,{});
           
            searchForDeepChildAndPush(myDartAST,{...layout,"namedProp": "child" });
            
           // myDartAST.properties.push({ ...layout, "namedProp": "child" })

          }
        }

      }

      buildDartASTfromAST(expression, myDartAST);

      createFlutterWidget(myDartAST, count);
    } catch (error) {

      console.log(error);
      code = error as string;
    }
    code += ');\n'

  } catch (error) {
    code = error as string
  }
  return code;
}

