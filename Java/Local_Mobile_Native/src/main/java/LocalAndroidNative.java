import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.appium.Target;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import org.openqa.selenium.Platform;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

class LocalAndroidNative {

    public static void main(String[] args) throws MalformedURLException {

        // Initialize the eyes SDK and set your private API key.
        Eyes eyes = new Eyes();
        eyes.setApiKey(System.getenv("APPLITOOLS_API_KEY"));

        DesiredCapabilities dc = new DesiredCapabilities("", "", Platform.ANY);
        dc.setCapability("platformName", "Android");
        dc.setCapability("deviceName", "OnePlus 6T");
        dc.setCapability("app", "https://applitools.jfrog.io/artifactory/Examples/app-debug.apk");

        // Open browser.
        AndroidDriver<AndroidElement> driver = new AndroidDriver<>(new URL("http://127.0.0.1:4723/wd/hub"), dc);
        driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

        try {


            eyes.open(driver, "Real Android", "Smoke Test - Android Native");

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
