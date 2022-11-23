
import theme from "../theme";
import { propConfig } from "../utils/styled-system";


const resolveTokens = (style: any) => {

  let localStyle = style;
 

    Object.entries(localStyle).forEach(([k, v]: any) => {
      var key: string = k;
      var value: any = v;
      
      if (typeof value !== "object") {
        if (propConfig.hasOwnProperty(key)) {
          const scale = propConfig[key]["scale"]
          var themeValueOfScale: any;
          if (scale) {
            if (scale === "colors") {
                themeValueOfScale = theme[scale][value.split(".")[0]][value.split(".")[1]];
                localStyle[key] = themeValueOfScale;
              
             
            } else {
              if (scale) {
                
                themeValueOfScale = theme[scale][v] ?? v; 
                localStyle[key] = themeValueOfScale;
  
              }
            }
          }
        }
      } else {
       
        resolveTokens(value);
      }
  
  
    });


  
 

  

  return style;
}


function mergeProps(style:any){
  Object.entries(style).forEach(([k, v]: any) => {
    var key: string = k;
    var value: any = v;
    if (typeof value !== "object") {
      if(propConfig.hasOwnProperty(key)){
       
        if(propConfig[key].hasOwnProperty("flutterProp")){

         
          style[propConfig[key]["flutterProp"]] = {[key]:value, ...style[propConfig[key]["flutterProp"]]}
         
          // if(isDecoration(propConfig[key]["flutterProp"])){
          //   let newStyle = style[propConfig[key]["flutterProp"]];
          //   style["decoration"]={[propConfig[key]["flutterProp"]]:newStyle}
            
          // }
          // delete style[key];
        
        }
      }
    }else {
      mergeProps(v)
    }
  });

  return style;
}





export { resolveTokens,mergeProps };