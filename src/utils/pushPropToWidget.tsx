
export function pushPropToWidget(ast: any, layoutWidget: any,widget:string) {
  debugger;
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
    Object.entries(ast.properties).forEach(([, v]: any) => {
    
      if (v.class === widget) {
        let index = v.properties.findIndex((data: any) => (data.namedProp === layoutWidget.namedProp));
        if (index < 0) {
          v.properties.push(layoutWidget);
        }
      }
    });
  }
}
  
}
