const { spawn } = require("child_process");
const { io } = require("../app");
const path = require("path");
const fs = require("fs");
const ngrok = require('ngrok'); 
const {
  filterCommandOutput,
  executeCommand,
} = require("../utils/socketHelpers");

const restrictedCommands = [
  'shutdown', 'reboot', 'rm -rf /', ':(){ :|:& };:', 'mkfs.ext4 /dev/sdX', 
  'dd if=/dev/zero of=/dev/sdX', '> filename', 'chmod 777 -R /', 'chown -R user:user /',
  'rm -rf .*', 'kill -9 -1', 'cat /dev/sda > file', 'mv /important_directory /dev/null',
  'find / -name "filename" -exec rm -f {} \\;', 'iptables -F', 'ifconfig eth0 down'
];

const mainSocket = (socket) => {
  let shell = null;
  let currDir = path.join(__dirname, '..', '..', 'public');

  if(!shell)
    shell = spawn('/bin/bash', { shell: true, cwd: currDir });

  shell.stdout.on('data', (data) => {
    socket.emit('terminal:data', data.toString().trim());
  });

  shell.stderr.on('data', (data) => {
    socket.emit('terminal:data', `Error: ${data.toString()}`);
  });

  shell.on('error', (error) => {
    console.error(`Shell error: ${error.message}`);
    socket.emit('terminal:error', error.message);
  });


  socket.on('terminal:write', (command) => {
    if (restrictedCommands.some((restrictedCommand) => command.startsWith(restrictedCommand))) {
      socket.emit('terminal:data', `Command "${command}" is restricted.`);
      return;
    }

    executeCommand(command, shell);
  });

  socket.on('file:change', ({ filePath, content }) => {
    filePath = path.resolve(currDir, filePath);

    if (!filePath.startsWith(currDir)) {
      socket.emit('terminal:data', 'Access to this file is restricted.');
      return;
    }

    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        socket.emit('terminal:data', `Error writing to file: ${err.message}`);
      }
    });
  });

  socket.on('file:create', ({ filePath, content }) => {
    filePath = path.resolve(currDir, filePath);

    if (!filePath.startsWith(currDir)) {
      socket.emit('terminal:data', 'Access to this file path is restricted.');
      return;
    }

    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        socket.emit('terminal:data', `Error creating file: ${err.message}`);
      } else {
        socket.emit('terminal:data', `File created: ${filePath}`);
      }
    });
  });

  socket.on('directory:create', (dirPath) => {
    dirPath = path.resolve(currDir, dirPath);

    if (!dirPath.startsWith(currDir)) {
      socket.emit('terminal:data', 'Access to this directory path is restricted.');
      return;
    }

    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        socket.emit('terminal:data', `Error creating directory: ${err.message}`);
      } else {
        socket.emit('terminal:data', `Directory created: ${dirPath}`);
      }
    });
  });


  socket.on('provide:url', async (port) => {
    try {
      const url = await ngrok.connect(port);
      socket.emit("terminal:data", `Public URL: ${url}`);
    } catch (error) {
      console.error("ngrok error:", error);
      socket.emit("terminal:data", `ngrok error: ${error.message}`);
    }
  });

  // Clean up when the socket disconnects
  socket.on('disconnect', async () => {
    if (shell) {
      shell.kill();
    }
    await ngrok.disconnect();  // Disconnect the ngrok tunnel
  });
};

module.exports = mainSocket;




// const mainSocket = (socket) => {
//   try {
//     console.log(`Socket connected!`, socket.id);
  
//     let shell = null;
//     let currentDir = null;
  
//     function initializeShell() {
//       if (!shell) {
//         currentDir = path.join(__dirname, "..", "..", "public");
//         shell = spawn("cmd", { shell: true, cwd: currentDir });
//         shell.stdout.on("data", (data) => {
//           console.log(data.toString())
//           const output = filterCommandOutput(data.toString());
//           console.log("Starting here")
//           console.log(output.toString().split());
//           console.log("Ending here")
//           if(output!=='')
//             socket.emit("terminal:data", output);
//         });
  
//         shell.stderr.on("data", (data) => {
//           socket.emit("terminal:data", data.toString());
//         });
  
//         shell.on("error", (error) => {
//           console.error(`Shell error: ${error.message}`);
//           socket.emit("terminal:error", error.message);
//         });
//       }
//     }
  
//     initializeShell();
  
    // socket.on("terminal:write", (data) => {
    //   console.log("----------------",data,"----------------");
    //   executeCommand(data, shell);
    // });
  
//     socket.on("test", (data) => console.log(data));
  
    // socket.on("file:change", ({ filePath, content }) => {
    //   console.log(filePath)
    //   filePath = path.join(currentDir, filePath);
    //   fs.writeFile(filePath, content, () => {});
    // });
  
//     socket.on("disconnect", () => {
//       if (shell) shell.kill();
//     });
    
//   } catch (error) {
//     console.log(error.message);
//   }
// };