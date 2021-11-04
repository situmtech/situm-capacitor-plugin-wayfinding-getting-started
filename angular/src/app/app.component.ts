import { Component } from '@angular/core';
import { SitumWayfinding } from 'situm-capacitor-plugin-wayfinding';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  maps: any = {};

  async startMap(targetId: string) {
    const element: HTMLElement | null = document.getElementById(targetId);
    if (!element) {
      return;
    }

    // if map already (being) initialized, avoid a new map being initialized
    if (this.maps[element.id] != undefined) {
      return;
    }
    
    // prevent race condition, where firing `startMap` quickly after one another, starts up multiple maps
    this.maps[element.id] = {};
    console.log("Now maps looks like this: " + JSON.stringify(this.maps));

    // finally create the map
    console.log('ATAG: Will try now to create the map');
    try {
      // LibrarySettings:
      const librarySettings = {
        user: "YOUR_SITUM_USER",
        apiKey: "YOUR_SITUM_APIKEY",
        iosGoogleMapsApiKey: "YOUR_IOS_GOOGLE_MAPS_APIKEY",
        buildingId : "YOUR_BUILDING_ID",
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
      this.maps[element.id] = null;
    }
  }

  async unload() {
    SitumWayfinding.unload();
  }

  async webClick(elementName: string) {
    alert(`You just clicked the ${elementName}`);
  }

  async grow() {
    const element = document.getElementById("mapOverlay");
    element?.classList.add("big");
  }
}


