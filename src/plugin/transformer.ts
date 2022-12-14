import { buildDartAST } from "..";

export const readReactAttribute = () => {
    let nodeName= "";
  
   
    return {
       
      visitor: {
        
        JSXOpeningElement:function(path:any){
          
          nodeName = path.node.name.name;

        },
        JSXAttribute: function(path:any) {
          let styles:any = {};
          if(path.node.name.name === "style") {
            var properties = path.node.value.expression.properties;
           
            Object.entries(properties).forEach(([,v]:any)=>{
              styles[v.key.name] = v.value.value
            
            });
         
            buildDartAST(nodeName,styles)
           
   
           
          }
        },
       
      }
    };
  };