import { resolveProps } from "../converter/prop-resolver";
import { mergeProps, resolveTokens } from "../converter/token-resolver";

let myTheme: any;
let codeString: any = '';
let defaultVariant: any;
let defaultSize: any = 0;
let bracketCount: number = 0;
let propBracketCount:number =0;

function resolveDefaultProps(styles: any, defaultSize: any) {

  Object.entries(styles).forEach(([k, v]: any) => {
    if (typeof v !== "object") {
      if (k === "size") {
        styles[k] = myTheme.sizes[defaultSize];
      } else if (k === "variant") {
        styles[k] = myTheme.variants[defaultVariant];
      }
    } else {
      resolveDefaultProps(v, defaultSize)
    }
  });
}


function buildProps(structure:any){
  Object.entries(structure).forEach(([_k,_v])=>{
   
    if(typeof _v !== "object" ){

      if(_k!== "class"){
        codeString+=`${_k}:${_v},`
      }
    } else {
      
      codeString+=`${_k}:${structure[_k]["class"]}(`
      propBracketCount += 1;
      buildProps(_v)
    
    }
    
  });
}



function generateFlutterWidget(structure: any): string {


  Object.entries(structure).forEach(([k, v]: any) => {
    if (typeof v !== "object") {
      if (k === "widget" || k==="class") {
        codeString += `${v}(`
        bracketCount += 1;
       
        if(structure["properties"]){
         
         buildProps(structure["properties"])
         codeString += ')'.repeat(propBracketCount)
         codeString+=','
         
         propBracketCount =0;
        
        }
        
      }

      


      

    } else {
      if (k === 'children') {
        let localCount = bracketCount
        codeString += `${k}:[`
       
        // bracketCount = 0;
        Object.entries(v).forEach(([, children]: any) => {
          console.log("children =>", children)
          if (typeof children?.child === 'object') {
            generateFlutterWidget(children);
          }
          else {
            generateFlutterWidget(children);
           
          }
        })
        codeString += `]`
        codeString += ')'.repeat(localCount)


      }
      else {
       
        if (k === "child") {
          codeString += `${k}:`
          generateFlutterWidget(v);
        }


      }

    }
    //codeString += ')'.repeat(bracketCount);
  });
  return codeString;
}



function createComponent(structure: any, _theme: any,) {

  myTheme = _theme;
  defaultVariant = _theme.defaultProps.variant;
  defaultSize = _theme.defaultProps.size;


  let resolvedToken = resolveTokens(_theme);
  let mergedProps = mergeProps(resolvedToken);
  let resolvedProps = resolveProps(resolvedToken, _theme.variants.solid.bg);



  resolveDefaultProps(resolvedProps, defaultSize);

  //let widget = generateFlutterWidget(structure,myTheme);
  console.log(mergedProps);
  console.log(structure);
  console.log(resolvedProps);
}




export { generateFlutterWidget, createComponent };


