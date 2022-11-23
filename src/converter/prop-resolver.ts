import {  isBorder, isBorderRadius, isColor, isSpace,  } from "./filter";
import toFBorder, { toAxisAlignment, toFBorderRadius, toFColor, toFMarginPadding } from "./flutter-properties";

function resolveProps (styles:any,primaryColor:any):any{
    Object.entries(styles).forEach(([k,v])=>{
        var key : any = k;
        var value: any = v;
        if(typeof value !== "object"){
            if(key=== "justifyContent"){
                styles["MainAxisAlignment"]= `MainAxisAlignment.${toAxisAlignment(value)}`
                delete styles[key];
            }
            if(key==="alignItems"){
                styles["CrossAxisAlignment"] = `CrossAxisAlignment.${toAxisAlignment(value)}`
                
                delete styles[key];
            }

          
              
            
            if(isColor({key})){
                styles[key]= toFColor(primaryColor,styles[key],key);
            }

           
           
        } else {
            if(isBorderRadius({key})){
                styles[key] = toFBorderRadius(styles);
            }
            if(isSpace({key})){
                styles[key]=toFMarginPadding( styles);
            }
          
            if(isBorder({key})){
                styles[key]=toFBorder(styles,key);
            }
            resolveProps(v,primaryColor);
        }
        
       
       
        
    });
    return styles;
}
export {resolveProps};