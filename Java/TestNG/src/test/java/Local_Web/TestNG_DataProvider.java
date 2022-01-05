package Local_Web;

import com.applitools.eyes.BatchInfo;
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.TestResultsSummary;
import com.applitools.eyes.selenium.ClassicRunner;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.StitchMode;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

import static com.google.common.base.Strings.isNullOrEmpty;

/**
 * Runs Applitools tests with TestNG DataProvider
 */
public class TestNG_DataProvider {

    private ClassicRunner runner;
    private Eyes eyes;
    private WebDriver driver;
    private static BatchInfo batch;

    @DataProvider(name="websites")
    public Object[][] websites()
    {
        return new Object[][] {{"https://www.google.com"}, {"https://www.applitools.com"}};
    }

    @BeforeTest
    public static void setBatch() {
        // Must be before ALL tests (at Class-level)
        batch = new BatchInfo();
//        batch = new BatchInfo("batch_name");
//        batch.setId("batch_id");
    }

    @BeforeClass
    public void beforeTest() {
        // Initialize the Runner for your test.
        runner = new ClassicRunner();

        // Initialize the eyes SDK
        eyes = new Eyes(runner);

        // Raise an error if no API Key has been found.
        if(isNullOrEmpty(System.getenv("APPLITOOLS_API_KEY"))) {
            throw new RuntimeException("No API Key found; Please set environment variable 'APPLITOOLS_API_KEY'.");
        }

        // Set your personal Applitols API Key from your environment variables.
        eyes.setApiKey(System.getenv("APPLITOOLS_API_KEY"));

        eyes.setBatch(batch);
        eyes.setStitchMode(StitchMode.CSS);

        // Use Chrome browser
        driver = new ChromeDriver();

    }

    @BeforeMethod
    public void beforeEach(){
        // Set AUT's name, test name and viewport size (width X height)
        // We have set it to 800 x 600 to accommodate various screens. Feel free to change it.
        eyes.open(driver, "Demo App", "Smoke Test", new RectangleSize(800, 600));
    }

    @AfterMethod
    public void afterEech() {
        eyes.closeAsync();
    }

    @Test(dataProvider = "websites")
    public void providerTest(String val) {


        // Navigate the browser to the "ACME" demo app.
        driver.get(val);

        // Visual checkpoint #1 - Check the login page.
        eyes.check("check window fully", Target.window().fully());

        // End the test.
    }



    @AfterTest
    public void afterTest() {
        // Close the browser.
        driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as
        // aborted.
        eyes.abortAsync();

        // Wait and collect all test results
        TestResultsSummary allTestResults = runner.getAllTestResults();

        // Print results
        System.out.println(allTestResults);
    }
}

