import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.appium.Target;
import org.openqa.selenium.Platform;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

class LocalAndroid {

    public static void main(String[] args) throws MalformedURLException {

        // Initialize the eyes SDK and set your private API key.
        Eyes eyes = new Eyes();
        eyes.setApiKey(System.getenv("APPLITOOLS_API_KEY"));
        
        DesiredCapabilities dc = new DesiredCapabilities("", "", Platform.ANY);
        dc.setCapability("platformName", "Android");
        dc.setCapability("deviceName", "OnePlus 6T");
        dc.setCapability("app", "https://applitools.jfrog.io/artifactory/Examples/app-debug.apk");

        // Open browser.
        RemoteWebDriver driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"), dc);
        driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

        try {


            eyes.open(driver, "Real Android", "Smoke Test - Android Web");

            // To see visual bugs after the first run, use the commented line below instead.
            driver.get("https://www.applitools.com");

            // Visual checkpoint #1 - Check the login page.
            eyes.check("check", Target.window().fully());

            // End the test.
            eyes.closeAsync();

        } finally {

            // Close the app.
            driver.quit();

            // If the test was aborted before eyes.close was called, ends the test as aborted.
            eyes.abortIfNotClosed();

        }

    }

}
