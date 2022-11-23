

const properties = "<-prop->";
const moreProperties = "";
const className = "<-className->";
const constructorProperties = "";
const widget = "<-widget->";
const variable = "<-variable->";
const func = "<-func->";


const TEXT = `
 Text(
  "Hello World",
  style: TextStyle(
    ${properties}
  ),
  ${moreProperties}
),
`.trim();

const Align = `
Align (
    ${properties}
    child:${TEXT}
       
    ),
`.trim();


const Padding = `
    Padding (
        ${properties}
        child:${Align}
       
    ),  
`.trim();

const InkWell = `
    InkWell (
        ${properties}
        child:${Padding}
       
    ),  
`.trim();

const Material = `
    Material(
        ${properties}
        child:${InkWell}
        
    ),
`.trim();

const Semantics = `
    Semantics (
        ${properties}
        child:${Material}
       
    ),  
`.trim();









const StatelessWidget = `
    class ${className} extends StatelessWidget {
        ${className}({${constructorProperties}});
        @override
        Widget build(BuildContext context){
            return ${widget}
        }
    }
`

const StatefulWidget =`
class ${className} extends StatefulWidget {
    const ${className}({super.key});
  
    @override
    State<${className}> createState() => _${className}State();
  }
  
  class _${className}State extends State<${className}> {
    ${variable}
    ${func}
    @override
    Widget build(BuildContext context) {
      return ${widget};
    }
  }`


export {TEXT,InkWell,Align,Material,Semantics,Padding,StatelessWidget,StatefulWidget}