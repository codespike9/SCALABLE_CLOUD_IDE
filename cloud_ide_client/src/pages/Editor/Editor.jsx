import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../components/editor/Sidebar';
import Terminal from '../../components/editor/Terminal';
import CodeEditor from '../../components/editor/CodeEditor';
import { useSocket } from '../../provider/SocketProvider';

const Editor = () => {
  const { socket } = useSocket();
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState(''); // Use this for terminal output
  const [fileContent, setFileContent] = useState('');

  const handleRunCode = () => {
    socket.emit('terminal:write', 'node index.js');
  };

  // Fetch file contents on mount
  useEffect(() => {
    const getFileContents = async () => {
      try {
        const response = await fetch(`http://localhost:2000/files/content?filePath=index.js`);
        const result = await response.json();
        setFileContent(result.content);
      } catch (error) {
        console.error('Error fetching file contents:', error);
      }
    };
    
    getFileContents();
  }, []);

  // Update code when fileContent changes
  useEffect(() => {
    setCode(fileContent);
  }, [fileContent]);

  // Listen to socket events for terminal output
  useEffect(() => {
    const handleTerminalData = (data) => {
      console.log(data);
      setOutput((prevOutput) => prevOutput + '\n' + data); // Append new output
    };

    socket.on('terminal:data', handleTerminalData);

    // Cleanup the socket listener on unmount
    return () => {
      socket.off('terminal:data', handleTerminalData);
    };
  }, [socket]);

  // Emit file change events with debounce
  useEffect(() => {
    if (code) {
      const timer = setTimeout(() => {
        socket.emit('file:change', {
          filePath: 'index.js',
          content: code,
        });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, socket]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-flex-col w-screen">
        <CodeEditor code={code} setCode={setCode} />

        {/* Pass the concatenated output to the Terminal */}
        <Terminal output={output} runCode={handleRunCode} />
      </div>
    </div>
  );
};

export default Editor;
