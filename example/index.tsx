import { convertNativeBaseThemeToFlutterWidgets } from '../.';

import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState } from 'react';

import sampleJSON from './sample.json';

function App() {
  const [code, setCode] = useState(JSON.stringify(sampleJSON, null, 4));
  const [output, setOutput] = useState('');

  const transpileCode = (code: string) => {
    setOutput(convertNativeBaseThemeToFlutterWidgets(code));
  };

  return (
    <div style={{ paddingLeft: 10, height: '100vh' }}>
      <h2 style={{ color: "#FFFFFF"}}>NativeBase Theme to Flutter Widgets</h2>
      <div style={{ flexDirection: 'row', display: 'flex', height: '80%' }}>
        {/* <div style={{ flex: 1, height: 600 }}>
          <div>Option 1</div>
          <div>Option 1</div>
          <div>Option 1</div>
        </div> */}
        <div
          style={{
            flex: 5,
            backgroundColor: '#4d4d4d',
            padding: 8,
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex',  height: '94%' }}>
            <textarea
              style={{ flex: 1, fontFamily: 'monospace', fontSize: 14 }}
              onChange={e => setCode(e.target.value)}
              value={code}
            />
            <div style={{ padding: '4px' }}></div>
            <textarea
              style={{ flex: 2, fontFamily: 'monospace', fontSize: 14 }}
              onChange={() => {}}
              value={output}
            />
          </div>
          <button
            style={{
              width: '100%',
              height: '6%',
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
