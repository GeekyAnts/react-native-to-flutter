import { convertNativeBaseThemeToFlutterWidgets } from '../.';

import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from 'react';
import Editor from "@monaco-editor/react";
// @ts-ignore
import flutter from '../example/img/flutter.png'

//let styles: any = {

//   position:"absolute",
//   flexGrow:4,
//   minHeight:4,
//  width:3,
//   height:4,
//   borderRadius:4,
//   borderWidth:3,
//   borderColor:"#fcfcfc",
//   paddingHorizontal:30,
//   paddingRight:40,
//   paddingBottom:50,
//   paddingTop:40,
//   maxWidth:30,
//   minWidth:50,
//   maxHeight:50,
//   margin:30,
//   borderBottomWidth:1,
//   borderTopWidth:3,
//   borderLeftWidth:4,
//   borderRightWidth:5,
//   flexDirection:"column",
//   alignContent:"space-between",
//   alignItems:"stretch",
//   // position:"absolute",
//   top:10,
//   right:20,
//   bottom:30,
//   left:40,

// color: "#ffffff",
// fontSize: 23,
// letterSpacing: 4,
// lineHeight: 4,
// fontStyle: "italic",
// fontWeight: 300,
// textAlign: "center",
// fontFamily: "abc"

//}
let styles = (`
<View style={{   
  minHeight:4,
  width:3,
  height:4,
  borderRadius:4,
  borderWidth:3,
  borderColor:"#fcfcfc",
  paddingHorizontal:30,
  paddingRight:40,
  paddingBottom:50,
  paddingTop:40,
  maxWidth:30,
  minWidth:50,
  maxHeight:50,
  margin:30,
  borderBottomWidth:1,
  borderTopWidth:3,
  borderLeftWidth:4,
  borderRightWidth:5,
  flexDirection:"column",
  alignContent:"space-between",
  alignItems:"stretch",
}}>
       <Text style={{
       color: "#ffffff",
       fontSize: 23,
       letterSpacing: 4,
       lineHeight: 4,
       fontStyle: "italic",
       fontWeight: 300,
       textAlign: "center",
       fontFamily: "abc"
       }}>This Widget is Made from React Native to Flutter Tool</Text>
</View>
`)


const theme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'custom-info', foreground: 'a3a7a9', background: 'ffffff' },
    { token: 'custom-error', foreground: 'ee4444' },
    { token: 'custom-notice', foreground: '1055af' },
    { token: 'custom-date', foreground: '20aa20' },
  ],
  colors: {
    'editor.foreground': '#FFFFFF',
    'editor.background': '#CFCFCF',
  }
}





function App() {
  const [code, setCode] = useState(styles);
  const [output, setOutput]: any = useState('');
  const [error, setError]: any = useState(false)
  const [isActiveReact,setIsActiveReact]:any = useState(true)
  const [isMobile,setIsMobile]:any = useState(false)
  const transpileCode = (code: string) => {
    setOutput(convertNativeBaseThemeToFlutterWidgets(code));
  };

  const editorRef: any = React.useRef(null);
  var myMonaco: any;

  // function handleEditorWillMount(monaco) {
  //   // here is the monaco instance
  //   // do something before editor is mounted
  //   myMonaco = monaco;
  //   monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  //   monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  //     target: monaco.languages.typescript.ScriptTarget.ES2016,
  //     allowNonTsExtensions: true,
  //     moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  //     module: monaco.languages.typescript.ModuleKind.CommonJS,
  //     noEmit: true,
  //     typeRoots: ["node_modules/@types"]
  //   });
  //   monaco.editor.defineTheme('myTheme', theme)
  //   debugger

  // monaco.editor.EditorOptions.automaticLayout;
  //   monaco.languages.typescript.typescriptDefaults.addExtraLib(
  //     `export declare function next() : string`,
  //     'node_modules/@types/external/index.d.ts');
  //   monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  //     noSemanticValidation: false,
  //     noSyntaxValidation: false
  //   })



  // }

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = monaco;
  }



  React.useEffect(() => {
    setOutput('')
    debugger
   console.log(window.innerHeight);
   if(window.innerWidth <=600){
    setIsMobile(true);
   } else {
    setIsMobile(false);
   }

  }, []);
  React.useEffect(() => {

    if (code && !error) {

      transpileCode(code)
    }
  }, [code]);

  return (

    <div style={{  position:"relative",overflow:"hidden",height:"100vh"}}>
      <div className='eclipse1'></div>
      <div className='eclipse2'></div>
      <div className='playground-footer'>
            <p>Built with <span>❤</span> <a style={{ color: "inherit" }} href='https://geekyants.com/'>@GeekyAnts</a></p>
          </div>
      <div className='playground-navbar'>

        <div style={{ flex: 1, marginLeft: "30px", color: "#fff" }}><h3 className='logoName'>RN2Flutter</h3></div>
        <div className='menu-wrapper' >
          <a className='issue' href="https://github.com/GeekyAnts/react-native-to-flutter/issues/new" style={{ justifySelf: "end", color: "#fff", paddingRight: "30px" }}>Report an issue</a>
          <a className='props' href='https://github.com/GeekyAnts/react-native-to-flutter/blob/main/README_API_CHECKLIST.md' style={{ justifySelf: "end", color: "#fff", paddingRight: "50px" }}>Supported Props</a>
          <a className='github' style={{ justifySelf: "end", color: "#000", fontWeight: "bolder", padding: "5px 15px", backgroundColor: "#fff", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }} href="https://github.com/GeekyAnts/react-native-to-flutter"><span><img height="20px" src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'></img></span> GitHub</a>
        </div>

      </div>

      <div style={{ flexDirection: 'row', display: 'flex',zIndex:"2",position:"relative",overflow:"hidden" }}>

        <div
          style={{
            flex: 1,
           
            padding: 8,
            justifyContent: 'center',
           

          }}
        >

          <div> <h3 className='playground-heading '>React Native Component to Flutter Widgets <span style={{ color: "#858181" }} >(Alpha)</span> </h3></div>
          <p className='playground-subheading '>Helpful for developers who are familiar with React Native but new to Flutter, as it allows them to leverage their knowledge of React Native styling and apply it to Flutter.</p>
          <div className='switch-wrapper' >
            <div className='switch-code'>
              <div  onClick={()=>{setIsActiveReact(!isActiveReact);console.log("hello")}} className={`${isActiveReact ? 'active-code':''}`} style={{flex:"1 1 0px" ,padding :"5px",whiteSpace:"nowrap",flexBasis:"100%",width:"100.00px",textAlign:"center",color:`${isActiveReact ?'#000':"#fff"}`}}>React Native</div>
              <div onClick={()=>{setIsActiveReact(!isActiveReact);console.log("hello")}} className={`${!isActiveReact ? 'active-code':''}`} style={{flex:"1 1 0px",padding:"5px",flexBasis:"100%",width:"100.00px",textAlign:"center",color:`${!isActiveReact ?'#000':"#fff"}`}}>Flutter</div>

            </div>
          </div>

          <div style={{ display: 'flex' }}>

          {isMobile ?  isActiveReact? reactEditor():<div></div>:reactEditor()}
            <div style={{ padding: '4px' }}></div>
            {isMobile ? !isActiveReact ? flutterEditor():<div></div>:flutterEditor()}


          </div>
          
        </div>
      </div>
    </div>
  );

  function flutterEditor(): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
    return <div style={{ flex: 1, textAlign: "center" }}>
      <img style={{ height: "20px", margin: "auto" }} src={flutter}></img>
      <p style={{ marginBottom: "20px", padding: 0, textAlign: "center", color: "#B6B6B6" }}>Flutter Widget</p>
      <div className='editor-container' style={{ marginRight: "10px" }}>
        <Editor

          options={{
            automaticLayout: true
          }}
          theme="vs-dark"
          defaultLanguage="dart"
          value={output}
          defaultValue={output} />

      </div>
    </div>;
  }

  function reactEditor(): string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined {
    return <div style={{ flex: 1, marginLeft: "10px", textAlign: "center" }}>
      <img style={{ height: "20px", margin: "auto" }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'></img>

      <p style={{ marginBottom: "20px", padding: 0, textAlign: "center", color: "#B6B6B6" }}>React Native Component</p>
      <div className="editor-container">
        <Editor
          options={{
            automaticLayout: true
          }}
          theme="vs-dark"
          defaultLanguage="dart"

          defaultValue={code}

          onMount={handleEditorDidMount}
          onValidate={(e) => {

            if (e.length > 1) {

              setError(true);
            } else {
              setError(false);
            }
          } }
          onChange={(e: string) => {
            if (!error) {
              setCode(e);
              setOutput('');
            }


          } } />

      </div>


    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
