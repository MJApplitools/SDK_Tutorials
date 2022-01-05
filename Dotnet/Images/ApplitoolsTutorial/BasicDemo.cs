using Applitools.Images;
using NUnit.Framework;
using System;
using System.Drawing;
using System.IO;
using System.Net;

namespace ApplitoolsTutorial
{

    [TestFixture]
    public class BasicDemo
    {
        private Eyes eyes;

        [Test]
        public void BasicTest()
        {
            // Initialize the eyes SDK and set your private API key.
            eyes = new Eyes();
            eyes.ApiKey = Environment.GetEnvironmentVariable("APPLITOOLS_API_KEY");

            // Start the session and set app name and test name.
            eyes.Open("Demo App - Images C#", "Smoke Test - Images C#");


            // Load page image and validate.
            Bitmap bitmap = GetImage(new Uri("https://i.ibb.co/bJgzfb3/applitools.png"));

            // Visual checkpoint.
            eyes.CheckImage(bitmap);

            // End the test.
            eyes.Close();
        }

        [TearDown]
        public void AfterEach()
        {
            eyes.AbortIfNotClosed();
        }

        static Bitmap GetImage(Uri uri)
        {
            var request = WebRequest.Create(uri);
            using (var response = request.GetResponse())
            using (var responseStream = response.GetResponseStream())
            {
                var imageStream = new MemoryStream();
                responseStream.CopyTo(imageStream);
                imageStream.Position = 0;

                return new Bitmap(imageStream);
            }
        }
    }
}
