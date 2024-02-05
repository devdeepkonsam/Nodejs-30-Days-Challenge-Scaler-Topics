const path = require('path')

function checkFileExtension(filePath, expectedExtension) {
    // Implementation
    if(path.extname(filePath)==expectedExtension){
        console.log(`File has the expected extension: ${expectedExtension}`);
    } else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${path.extname(filePath)}`);
    }
}

checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png