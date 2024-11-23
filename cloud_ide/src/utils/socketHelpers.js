function executeCommand(data,shell){
    if(shell){
        shell.stdin.write(data+'\n');
    }
}

function filterCommandOutput(output){
    console.log(output)
    let lines=output.split('\n');
    lines=lines.slice(0,-1);
    return lines.join('\n').trim();
}

module.exports={filterCommandOutput,executeCommand}