

import { styleSystem } from "./config";
import { flutterWidget } from "./config/flutter-widgets";
import { pushPropToWidget } from "./utils/pushPropToWidget";

import * as parser from '@babel/parser';
//@ts-ignore
import xyz from '@babel/preset-react'
// import { transformer } from "./plugin/transformer";



let mapReactComponentToFlutterWidgets: any = {
  "View": flutterWidget.Container,
  "Text": flutterWidget.Text
};


let count = 0;














export function buildDartAST(component: any, theme: any) {

  let dartAST: any = {}

  try {
    let widget: any = {...mapReactComponentToFlutterWidgets[component]};
    
    delete widget.properties;
    widget.properties = []
   let a = ''
    a = widget;

    clearProperties(theme);

   dartAST = loopStyle(theme,a);

   

  } catch (error) {
    console.error(error)
    return error
  } finally {
    return dartAST;
    // createFlutterWidget(dartAST,count)

  }



}








function loopStyle(theme: any,ast:any) {

  Object.entries(theme).map(([k, v]: any) => {



    if (styleSystem.hasOwnProperty(k)) {

      if (styleSystem[k].hasOwnProperty("partOf")) {
        if (ast["properties"]) {

          let newVal = { [styleSystem[k].partOf.property]: styleSystem[k].partOf.class };
          let myObject = addProperty(newVal[styleSystem[k].partOf.property], v, k, theme,ast);
          let widget = styleSystem[k].widget;
          if (myObject.nested) {
            ast = myObject.object;
          } else {
            pushPropToWidget(ast, myObject, widget);
          }




        }
      } else {

        let newVal = { ...styleSystem[k].class };
        let myObject = addProperty(newVal, v, k, theme,ast);
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

function clearProperties(theme: any) {
  Object.entries(theme).map(([k,]: any) => {
    if (styleSystem.hasOwnProperty(k)) {
      if (styleSystem[k].hasOwnProperty("partOf")) {
        styleSystem[k].partOf.class.properties = [];
      }
    }
  });
}

function addProperty(myObject: any, val: any, prop: any, style: any,ast:any) {
  
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
        newProp = styleSystem[prop].transformer(style, newProp, ast);

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
        myObject = { ...myObject, properties: myObject.properties }
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

    if (ast.hasOwnProperty("value")) {
      code += `${tab.repeat(c)}${ast.class}('${ast.value}',\n`
    } else {
      code += `${tab.repeat(c)}${ast.class}(\n`
    }

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












export const convertNativeBaseThemeToFlutterWidgets = (styles: any): string => {






  try {
    //let a = buildDartAST(component, styles);

    // if (a.message) {
    //   return code = a.message;
    // } else {
    //   createFlutterWidget(a, count)
    // }
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
        if(attributes){
          if (attributes?.name?.name === "style") {

            let properties = attributes.value.expression.properties;
            Object.entries(properties).forEach(([, v]: any) => {
              style[v.key.name] = v.value.value
            });
            myDartAST = buildDartAST(name, style)
            
            
           
          }
        }
        
      }
      buildDartASTfromAST(expression, myDartAST);

      createFlutterWidget(myDartAST, count);
    } catch (error) {

      console.log(error);
      code = error as string;
    }








    // babel.transform(styles, 
    //       { 
    //         ast:true,
    //         presets:[xyz],
    //         plugins: [readReactAttribute], 

    //       }
    //     );

    code += ');\n'
    //console.log(a)


  } catch (error) {
    code = error as string
  }


  return code;
}
function buildDartASTfromAST(expression: any, myDartAST: any) {
  debugger
  let ast = myDartAST;
  console.log(ast);
  console.log(myDartAST);
  if (expression.children.length < 2) {
    if (myDartAST.class) {
      let index = myDartAST.properties.findIndex((data: any) => (data.namedProp === "child"));
      if (myDartAST.properties[index]?.class === "Row" || myDartAST.properties[index]?.class === "Column") {
        let i = myDartAST.properties[index].properties.findIndex((data: any) => (data.namedProp === "children"));
        debugger;
        if (i > -1) {
          myDartAST.properties[index].properties[i].values = [];
        }
      }
    }
  }

  let index = myDartAST?.properties?.findIndex((data: any) => (data.namedProp === "child"));
  if(index){
    if (myDartAST?.properties[index]?.class === "Row" || myDartAST?.properties[index]?.class === "Column") {
      let i = myDartAST.properties[index].properties.findIndex((data: any) => (data.namedProp === "children"));
      if (i > -1) {
        myDartAST.properties[index].properties[i].values = [];
      }
    }
  }
  

  Object.entries(expression.children).forEach(([k, v]: any) => {
    let value = "";

    if (v.type === "JSXElement") {

      let style = {};
      if (v.children.length > 0) {
        if (v.children[0].type === "JSXText") {
          value = v.children[0].value
        }
      } else {
        value = '';
      }

      debugger;
      let name = v.openingElement.name.name;
      let attributes = v.openingElement.attributes[0];

      if (attributes) {

        let properties = attributes.value.expression.properties;
        Object.entries(properties).forEach(([, v]: any) => {

          style = { ...style, [v.key.name]: v.value.value }
        });

        if (myDartAST.class) {
          let a: any = {};
          a = buildDartAST(name, style)
          
          if (v.children.length > 0) {
            if (v.children[0].type === "JSXText") {
              a = { ...a, id: k, value: value };
            }
          } else {
            a = { ...a, id: k,};
          }
          
          let index = myDartAST.properties.findIndex((data: any) => (data.namedProp === "child"));
          if (myDartAST.properties[index]?.class === "Row" || myDartAST.properties[index]?.class === "Column") {

            let i = myDartAST.properties[index].properties.findIndex((data: any) => (data.namedProp === "children"));
            debugger
            if (i > -1) {
              let ii = myDartAST.properties[index].properties[i].values.findIndex((data: any) => (data.id === a.id));
              if (ii > -1) {
                myDartAST.properties[index].properties[i].values.splice(ii, 1);
              }
              myDartAST.properties[index].properties[i].values.push(a);

            } else {
              myDartAST.properties[index].properties.push({ namedProp: "children", type: "Array", values: [a] })
            }

          } else {

            myDartAST.properties.push({ "namedProp": "child", ...a });
          }

        } else {

        }

        console.log(style);
        console.log(myDartAST);
      } 

    }
  });

}

