import { buildDartAST } from "./index";

export function buildDartASTfromAST(expression: any, myDartAST: any, recursive: boolean = false) {

  let ast = myDartAST;
  console.log(ast);
  console.log(myDartAST);

  if (!recursive) {
    if (expression.children.length < 2) {
      if (myDartAST?.class) {
        let index = myDartAST.properties.findIndex((data: any) => (data.namedProp === "child"));
        if (myDartAST.properties[index]?.class === "Row" || myDartAST.properties[index]?.class === "Column") {
          let i = myDartAST.properties[index].properties.findIndex((data: any) => (data.namedProp === "children"));

          if (i > -1) {
            myDartAST.properties[index].properties[i].values = [];
          }
        }
      }
    }

    let index = myDartAST?.properties?.findIndex((data: any) => (data.namedProp === "child"));
    if (index) {
      if (myDartAST?.properties[index]?.class === "Row" || myDartAST?.properties[index]?.class === "Column") {
        let i = myDartAST.properties[index].properties.findIndex((data: any) => (data.namedProp === "children"));
        if (i > -1) {
          myDartAST.properties[index].properties[i].values = [];
        }
      }
    }
  }



  Object.entries(expression.children).forEach(([k, v]: any) => {

    let a: any = {};

    if (v.type === "JSXElement") {

      let style = {};



      let name = v.openingElement.name.name;
      let attributes = v.openingElement.attributes[0];



      let properties = attributes?.value?.expression?.properties;
      if (properties) {
        Object.entries(properties).forEach(([, v]: any) => {

          style = { ...style, [v.key.name]: v.value.value };
        });

      }

      if (myDartAST?.class) {

        a = buildDartAST(name, style);

        if (name === 'Text') {

          a = { ...a, id: k, value: '' };
        } else {
          a = { ...a, id: k };
        }



        let index = myDartAST?.properties?.findIndex((data: any) => (data.namedProp === "child"));
        if (myDartAST.properties[index]?.class === "Row" || myDartAST.properties[index]?.class === "Column") {

          let i = myDartAST?.properties[index]?.properties.findIndex((data: any) => (data?.namedProp === "children"));

          if (i > -1) {
            let ii = myDartAST?.properties[index]?.properties[i]?.values?.findIndex((data: any) => (data.id === a.id));
            if (ii > -1) {
              myDartAST?.properties[index].properties[i].values.splice(ii, 1);
            }
            myDartAST?.properties[index].properties[i].values.push(a);

          } else {
            myDartAST?.properties[index].properties.push({ namedProp: "children", type: "Array", values: [a] });
          }

        } else {

          myDartAST?.properties.push({ "namedProp": "child", ...a });
        }

      } else {
      }

      console.log(style);
      console.log(myDartAST);


    }

    if (v.children) {
      if (v.children.length > 0) {
        console.log(v);
        buildDartASTfromAST(v, a);
      }
    }

  });



}
