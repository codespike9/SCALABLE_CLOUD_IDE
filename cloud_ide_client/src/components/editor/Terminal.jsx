// components/Terminal.js
import React, { useState, useEffect } from 'react';

const Terminal = ({ output, runCode }) => {
  const [terminalOutput, setTerminalOutput] = useState(output);

  // Whenever new output is passed in, append it to the terminal output
  useEffect(() => {
    if (output) {
      setTerminalOutput(prevOutput => prevOutput + '\n' + output);
    }
  }, [output]);

  return (
    <div className="bg-black text-white 2xl:h-1/2 ">
      <div className='p-2 text-sm text-balance border-b-2 '>
        <center className='flex gap-2 items-center '>
          <span>Terminal</span>
          <button
            className="px-2 py-1 bg-green-600 rounded hover:bg-green-500"
            onClick={()=>{
              setTerminalOutput('');
              runCode()}}
          >
            Run Code
          </button>
        </center>
      </div>
      <div className="overflow-y-auto h-96 p-4 border">
        <pre>{terminalOutput}</pre>
      </div>
    </div>
  );
};

export default Terminal;
