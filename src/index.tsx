// Delete me
export const convertNativeBaseThemeToFlutterWidgets = (code: any): string => {
  
  var theme = JSON.parse(code);
  var buttons = theme.components.Button;
  var dartCode: string = "";
  var _dartCode: string="";
  

  var variants = buttons.variants;

  var alias: any ={
    "bg":"backgroundColor:MaterialStateProperty.all(const Color(0xff_))",
    "border":"side:MaterialStateProperty.all(const BorderSide(width: _.0,style: BorderStyle._,color:Color(0xff_)))"
  };

  
 
  Object.entries(variants).forEach(([vKey,vVal])=>{
    _dartCode += `class ${vKey.charAt(0).toUpperCase()}${vKey.slice(1)}Button extends StatelessWidget { 
    \tconst ${vKey.charAt(0).toUpperCase()}${vKey.slice(1)}Button({super.key});
    \t@override\n\tWidget build(BuildContext context){
    \treturn ElevatedButton(
    \t\tonPressed:()=>{}, 
    \t\tstyle:ButtonStyle(\n`;
    
    var props: any = vVal;
    Object.entries(props).forEach(([pKey,pVal])=>{
      var flutterVal:string = pVal as string;
      if(!(typeof alias[pKey] === "undefined")){
        var aliasMeaning = alias[pKey];
        // remove #
        flutterVal = flutterVal.replace("#","");
        /// remove px
        flutterVal = flutterVal.replace("px","");
        var list = flutterVal.split(" ");
        for(var v in list){
          aliasMeaning = aliasMeaning.replace("_",list[v]);
        }
       
       
        _dartCode += `\t\t\t${aliasMeaning}\n`
      }
      
    });
   
    _dartCode += `\t\t),
    \t\tchild:const Text("Hello"), \n
    \t);
    }
}\n`
});
  

  
  

 dartCode+=_dartCode;
 
  return dartCode;
};
