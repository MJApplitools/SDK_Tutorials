import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.images.Eyes;
import com.applitools.eyes.images.Target;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

public class DemoImages {

    public static void main(String[] args) {
        test();
    }

    public static void test() {

        Eyes eyes = new Eyes();

        try {
            eyes.open("Demo App - Images Java", "Smoke Test - Images Java", new RectangleSize(800, 600));
            BufferedImage img = ImageIO.read(new URL("https://i.ibb.co/bJgzfb3/applitools.png"));
            eyes.check("Image buffer", Target.image(img));
            eyes.close();
        } catch(IOException ex){
            System.out.println(ex);
        } finally {
            eyes.abortIfNotClosed();
        }
    }
}