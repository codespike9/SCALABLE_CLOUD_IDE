// components/CodeEditor.js
import React from 'react';
import AceEditor from 'react-ace';

// Import Ace Editor modes and themes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode }) => {
  const onChange = (newValue) => {
    setCode(newValue);
  };

  return (
    <div className=" p-2 bg-gray-700 2xl:h-1/2 ">
      <AceEditor
        mode="javascript"
        theme="monokai"
        name="codeEditor"
        onChange={onChange}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        className="border rounded h-full w-full"
        style={{ width: 'screen', height: '470px'}}
      />
    </div>
  );
};

export default CodeEditor;
