const cp = require('child_process');

function executeCommand(command) {
    // Implementation
    cp.exec(command, (error, stdout) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        console.log(`Expected output:\n${stdout}`);
      });
}


executeCommand('ls -la');
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!