import button from "../ast/widget/buttons";
import { resolveProps } from "../converter/prop-resolver";
import { resolveTokens } from "../converter/token-resolver";
import { StatefulWidget } from "./template/template";



let theme: any;
let defaultSize: any;
let defaultVariant: any;





/**
 * 
 * @param styles 
 * @param defaultSize 
 */
function resolveDefaultProps(styles: any, defaultSize: any) {

    Object.entries(styles).forEach(([k, v]: any) => {
        if (typeof v !== "object") {
            if (k === "size") {
              
                styles[k] = theme.sizes[defaultSize];
            } else if (k === "variant") {
                styles[k] = theme.variants[defaultVariant];
            }
        } else {
            resolveDefaultProps(v, defaultSize)
        }
    });
}

/**
 * 
 * @param buttonTheme 
 * @returns 
 */
function buildButton(buttonTheme: any): any {

    
    theme = buttonTheme;
    defaultVariant = buttonTheme.defaultProps.variant;
    defaultSize = buttonTheme.defaultProps.size;


    resolveTokens(buttonTheme);
    resolveProps(buttonTheme,buttonTheme.variants.solid.bg);
    resolveDefaultProps(buttonTheme, defaultSize);


    console.log(button);
    
    var buttonWidget: any;
    var myButton:any="";
    var variable:any=``;
    var func:any=``;
    Object.entries(buttonTheme.variants).forEach(([k,v]:any)=>{

   variable+=`Color backgroundColor = ${v.bg ? v.bg : "Colors.transparent"};`;

   func=`void onHover (bool val){
    if(val){
      backgroundColor = ${v._hover.bg ?? "Colors.transparent"};
    } else {
      backgroundColor = ${v.bg ? v.bg : "Colors.transparent"};
    }
    setState((){});
  }`

    buttonWidget = `
    Semantics(
        button: true,
        enabled: true,
        child: Material(
          clipBehavior: Clip.antiAlias,
          elevation: 0.0,
          key: widget.key,
          borderOnForeground: true,
          surfaceTintColor: null,
          type: MaterialType.button,
          shadowColor: null,
          textStyle: TextStyle(
            color: ${v._text.color},
            fontSize : ${buttonTheme.defaultProps.size._text.fontSize},
           
          ),
          color: backgroundColor,
          shape: RoundedRectangleBorder(borderRadius: ${buttonTheme.baseStyle.borderRadius ?? "BorderRadius.all(const Radius.circular(0))"},${v.borderWidth? "side:"+v.borderWidth+",":""}),
          child: InkWell(
            onTap: () => {},
            onHover:onHover,
            child: const Padding(
              padding:${buttonTheme.defaultProps.size.px},
              child: Align(
                heightFactor: 1.0,
                alignment: ${buttonTheme.baseStyle.alignItems ?? "Alignment.center"},
                widthFactor: 1.0,
                child: Text("Hello"),
              ),
            ),
          ),
        ),
      )
    `
        let myClass: any = StatefulWidget.replace("<-widget->",buttonWidget);
        myClass = myClass.replaceAll("<-className->",k.charAt(0).toUpperCase() + k.slice(1)+"Button");
        myClass = myClass.replaceAll("<-variable->",variable);
        myClass = myClass.replaceAll("<-func->",func);
        
        myButton +=myClass
        variable=``;
        func=``;
        
    });
   
    return {"dartCode":myButton,"theme":buttonTheme};



}






export { buildButton };
