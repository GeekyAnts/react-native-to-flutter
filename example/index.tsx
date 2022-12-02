import { convertNativeBaseThemeToFlutterWidgets } from '../.';

import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from 'react';

import Editor from "@monaco-editor/react";

let styles: any = {

  
  
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
  position:"absolute",
  top:10,
  right:20,
  bottom:30,
  left:40,

}

function App() {
  const [code, setCode] = useState(JSON.stringify(styles, null, 2));
  const [output, setOutput]: any = useState('');
  const [error,setError]:any = useState(false)
  const transpileCode = (code: string) => {
   
    setOutput(convertNativeBaseThemeToFlutterWidgets(code));
  };

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  React.useEffect(() => {
    console.log(output);
  }, [output])

  React.useEffect(()=>{
    setOutput('')

  },[]);
  React.useEffect(()=>{
    
    if(code && !error){
      
       transpileCode(code)
    }
  },[code]);

  return (

    <div style={{ height: '100vh' , padding:"10px"}}>
      <h3 style={{ color: "#FFFFFF",borderBottom:"1px solid #cfcfcf",paddingBottom:"5px" }}>React Native Component to Flutter Widgets</h3>
      <div style={{ flexDirection: 'row', display: 'flex', height: '80%' }}>
        
        <div
          style={{
            flex: 1,
            backgroundColor: '#4d4d4d',
            padding: 8,
            justifyContent: 'center',
            height: '100%',
          }}
        >
           
            <p  style={{ color: "#FFFFFF" }}> Select React Native Component and add styles in the editor</p>
            <p style={{ color: "#FFFFFF",margin:0,padding:0 }}>React Native Component</p>
           <div style={{flex:1}}><select style={{width:"10%",marginBottom:"10px",padding:"2px"}}>
            <option>View</option>
            </select></div>
          <div style={{ display: 'flex', height: "calc(100vh - 120px)" }}>
           
            <div style={{ flex: 1, height: "100%" }}>
              <Editor
                theme="vs-dark"
                defaultLanguage="json"
                defaultValue={code}
                beforeMount = {handleEditorWillMount}
                onValidate={(e)=>{
                  if(e.length>1){
                    debugger
                    setError(true);
                  }
                }}
                onChange = {(e:string)=>{
                  if(!error){
                    setCode(e)
                    setOutput('')
                  }
                 
                  
                }}
              />

              
            </div>
            <div style={{ padding: '4px' }}></div>
            <div style={{ flex: 1, height: "100%" }}>
              
              <Editor
                theme="vs-dark"
                defaultLanguage="dart"
                value={output}
                defaultValue={output}
              />
            </div>



          </div>
          <button
            style={{
              width: '100%',
             
              backgroundColor: '#aae8dc',
              color: '#4a5567',
              border: 'none',
              borderRadius: 5,
              marginTop: 4,
            }}
            onClick={() => transpileCode(code)}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
