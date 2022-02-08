const { ConsoleLogHandler, Eyes } = require('@applitools/eyes-images'); 

let viewportSize = {width: 1500, height: 800}

const main = async function() {
    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    // Define the OS and browser to identify the baseline
    eyes.setHostOS("Linux");
    eyes.setHostApp("Chrome");

    eyes.setLogHandler(new ConsoleLogHandler(true));
    try {
        await eyes.open("JS Images", "Image Test", viewportSize); 
        await eyes.checkImage(__dirname + "/photos/example.png");
        await eyes.close(); 
    } catch(e) {
        await eyes.abortIfNotClosed();
    }
}
main();