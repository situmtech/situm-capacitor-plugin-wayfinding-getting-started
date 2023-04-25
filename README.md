# situm-capacitor-plugin-wayfinding-getting-started

This sample application has been designed to test [Situm Wayfinding Module for Capacitor](https://github.com/situmtech/situm-capacitor-plugin-wayfinding). Situm Wayfinding Module for Capacitor has been designed to create indoor location applications in the simplest way, using Capacitor. It has been built in the top of the Situm SDK and its functionalities has been widely tested. If you are interested in building applications using the Situm SDK, please refer to [Situm Android SDK Sample app](https://github.com/situmtech/situm-android-getting-started).

With this application you can:

1. Load a native Situm Map that is integrated into your Capacitor views.
2. Start positioning at any building of your Situm account.
3. Start navigation in your buildings.
4. Interact with both HTML and native elements.

When you first run this app you will see a header, body and footer HTML elements (plus a floating overlay).
Touch the body to load the native Situm Map.
You can also touch the HTML elements and display a dialog responding to the event.

Initial View               | SitumWayfinding Loaded     | Navigation
:-------------------------:|:-------------------------: |:-------------------------:
![Initial View](images/wyf-pre-load.png?raw=true "Initial view")  |  ![SitumWayfinding Loaded](images/wyf-loaded.png?raw=true "SitumWayfindingLoaded") | ![Navigation](images/wyf-navigation.png?raw=true "Navigation")


## Submitting Contributions

You will need to sign a Contributor License Agreement (CLA) before making a submission. 
[Learn more here.](https://situm.com/contributions/)

## Requirements

### Setup your Situm Account

Before running this application you must set up an account in our [Dashboard](https://dashboard.situm.com), retrieve your API KEY and configure your first building.

1. Go to the [sign in form](http://dashboard.situm.com/accounts/register) and enter your username and password to sign in.
2. Go to the [account section](https://dashboard.situm.com/accounts/profile) and on the bottom, click on “generate one” to generate your API KEY.
3. Go to the [buildings section](http://dashboard.situm.com/buildings) and create your first building.
4. Download Situm Mapping Tool in Play Store (Only Android devices) and calibrate your building. Check out [our user guide](https://situm.com/docs/03-calibration/) for detailed information.
5. Go to the main app file in the Angular Framework, it is in `angular/src/app/app.component.ts`. Your Situm user name, API KEY and building ID must be set in the `LibrarySettings` object of this example app:
```typescript
const librarySettings = {
          user: "YOUR_SITUM_USER",
          apiKey: "YOUR_SITUM_APIKEY",
          buildingId: "YOUR_BUILDING_ID",
          ...
        };
```
6. For your convenience, we have added the file `app.constants.json` where you can establish this data. This file is imported from the main app file and used to fill the `LibrarySettings` object.

See [Situm Wayfinding Module for Capacitor](https://github.com/situmtech/situm-capacitor-plugin-wayfinding) for more detailed information on the `LibrarySettings`.

### Setup your Google Maps API KEY:

A Google Maps API KEY is required to run this example app.
More info is available in the official [Google Documentation](https://developers.google.com/maps/documentation/android-sdk/get-api-key).
Make sure to enable your API KEY for the platforms of your choice.

1. iOS: put your API KEY in the `LibrarySettings` object of this example app (or `app.constants.json`).
```typescript
const librarySettings = {
          ...
          iosGoogleMapsApiKey: "YOUR_IOS_GOOGLE_MAPS_APIKEY",
          ...
        };
```
2. Android: put your API KEY in `AndroidManifest.xml`. You will find this file in the `android/src/main` folder of your project.
```xml
<meta-data android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_ANDROID_GOOGLE_MAPS_APIKEY"/>
```

### Dependencies

#### Android

The [Situm Wayfinding Module for Capacitor](https://github.com/situmtech/situm-capacitor-plugin-wayfinding) depends on the [Situm Wayfinding for Android visual component](https://situm.com/docs/01-android-quickstart-guide/). This has been already done for you in this sample application, but keep in mind for new projects that the Situm Repository must be added to your project `build.gradle` file to resolve the dependency:
```groovy
allprojects {
    repositories {
        maven { url "https://repo.situm.com/artifactory/libs-release-local" }
        ...
```

If you are targeting Android Pie devices (or above), add Apache Http Legacy to your `AndroidManifest.xml`:
```xml
<uses-library
  android:name="org.apache.http.legacy"
  android:required="false"/>
```

## How to Run

1. Change into the Angular Framework directory, then run `npm install`.
2. Build the web app: `npm run build`.
3. Copy the built web app into the native platform: `npx cap sync`.
4. Open the native IDE and run the app: `npx cap open android/ios` (or run with `npx cap run android/ios`).

## Troubleshooting

* Check your current `node` and `npm` versions:
  ```
    $ node -v
    vX.Y.X
    $ npm -v
    A.B.C
  ```
  Update them if necessary. We recommend using a __node version manager__ such us:

  * Linux and MacOS: [nvm](https://github.com/nvm-sh/nvm).
  * Windows: [NVS](https://github.com/jasongin/nvs) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

* `npm` may produce an error installing the [Capacitor Google Maps](https://github.com/situmtech/capacitor-google-maps.git#situm-alpha.0) dependency. If so, install it manually first and finally complete the dependency tree executing:
  ```
  $ npm install https://github.com/situmtech/capacitor-google-maps.git#situm-alpha.0
  $ npm install
  ```

* For Android developers we assume that Android Studio is installed. If not, install it.
  Check your environmment variable `JAVA_HOME`, make sure it points to the `jre` bundled with your Android Studio installation.

  * Linux and MacOS:
  ```
    export JAVA_HOME=/your/path/to/android/studio/jre
  ```
  Add the previous line to your `.bashrc` if you want to keep its value between sessions.
  * Windows:
  ```
    set JAVA_HOME=C:\your\path\to\android\studio\jre
  ```
  Again, add the `JAVA_HOME` variable to your environment variables if you want to keep its value between sessions.


* We assume you have [git](https://git-scm.com/) installed on your system. If not, install it.
