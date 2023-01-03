
export function pushPropToWidget(ast: any, layoutWidget: any,widget:string) {

if(layoutWidget.nested){
  ast = layoutWidget.object;
  return ast;
}else {
  if (ast.class === widget) {
    let index = ast.properties.findIndex((data: any) => (data.namedProp === layoutWidget.namedProp));
    if (index < 0) {
      ast.properties.push(layoutWidget);
    }

  } else {
    searchWidgetAndPush(ast.properties);
  }
}
  

  function searchWidgetAndPush(prop:any) {
    Object.entries(prop).forEach(([, v]: any) => {
      if (v.class === widget) {
        let index = v.properties.findIndex((data: any) => (data.namedProp === layoutWidget.namedProp));
        if (index < 0) {
          v.properties.push(layoutWidget);
        }
      } else {
        if(v.hasOwnProperty("properties")){
          searchWidgetAndPush(v.properties);
        }
       
      }
    });
  }
}
