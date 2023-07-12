function readCode() {
    // Retrieve user code from textarea
    var userCode = document.getElementById("code-editor").value;

    // Create a temporary C++ file
    var cppCode = `${userCode}`;

    // Save the C++ code to a file, e.g., 'main.cpp'
    var fileName = 'main.cpp';
    var fileContent = new Blob([cppCode], { type: 'text/plain' });
    var fileURL = URL.createObjectURL(fileContent);
}

// Execute the main function
document.getElementById('submit-button').addEventListener('click', executeCode);

async function executeCode() {
    readCode();
  // Compile the C++ code to WebAssembly using Emscripten
  var command = `emcc ${fileName} -o output.html`;
  var result = await runCommand(command);

  // Execute the compiled code within the browser
  var outputFrame = document.getElementById('outputFrame');
  outputFrame.src = 'output.html';
}

// Function to run shell commands using Emscripten's 'emrun' tool
function runCommand(command) {
    return new Promise((resolve, reject) => {
        var process = new Process();
        process.onExit = function (status) {
            resolve(status);
        };
        process.onError = function (message) {
            reject(message);
        };
        process.run(command.split(' '));
    });
}
