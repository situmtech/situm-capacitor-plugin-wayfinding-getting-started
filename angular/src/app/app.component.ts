import { Component } from '@angular/core';
import { SitumWayfinding } from 'situm-capacitor-plugin-wayfinding';
import Constants from '../app.constants.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  async startMap(targetId: string) {
    const element: HTMLElement | null = document.getElementById(targetId);
    if (!element) {
      return;
    }

    // finally create the map
    console.log('ATAG: Will try now to create the map');
    try {
      // LibrarySettings:
      const librarySettings = {
        user: Constants.credentials.situmUser,
        apiKey: Constants.credentials.situmKey,
        iosGoogleMapsApiKey: Constants.credentials.googleMapsApiKeyIOS,
        buildingId : Constants.buildingId,
        dashboardUrl: "https://dashboard.situm.com",
        hasSearchView: true,
        searchViewPlaceholder: "Capacitor WYF",
        useDashboardTheme: false,
      };
      console.log(`ATAG: will call now SitumWayfinding#load(${JSON.stringify(librarySettings)})`)
      const wyfResponse = await SitumWayfinding.load(element, librarySettings);
      console.log(`ATAG: call to load finished with result: ${JSON.stringify(wyfResponse)}`);

    } catch (e) {
      alert('ATAG: Some kind of mysterious error just happened!!!');
      console.log('ATAG: // ERROR:');
      console.log(`ATAG: ${e}`);
      console.log('ATAG: // END ERROR.');
    }
  }

  async unload() {
    await SitumWayfinding.unload();
  }

  async webClick(elementName: string) {
    alert(`You just clicked the ${elementName}`);
  }

  async grow() {
    const element = document.getElementById("mapOverlay");
    element?.classList.add("big");
  }
}


