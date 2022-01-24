import { 
  Component,
  NgZone
 } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { 
  SitumWayfinding,
  OnPoiSelectedResult,
  OnPoiDeselectedResult,
  OnFloorChangeResult } 
  from 'situm-capacitor-plugin-wayfinding';

const MY_BUILDING_ID = "---";
const MY_POI_ID = "---";
const MY_FLOOR_ID = "---";
const MY_NAV_POINT_LAT = 0.0;
const MY_NAV_POINT_LNG = 0.0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  maps: any = {};
  captureTouchEvents = true;
  showOuterHTML = false;
  autostartMode = "centerPoi";

  constructor(
    private ngZone: NgZone,
    private toastController: ToastController
    ) {}

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
        user: "---",
        apiKey: "---",
        iosGoogleMapsApiKey: "YOUR_IOS_GOOGLE_MAPS_APIKEY",
        buildingId : MY_BUILDING_ID,
        dashboardUrl: "https://dashboard.situm.com",
        hasSearchView: true,
        searchViewPlaceholder: "Capacitor WYF",
        useDashboardTheme: true,
      };
      console.log(`ATAG: will call now SitumWayfinding#load(${JSON.stringify(librarySettings)})`)
      const wyfResponse = await SitumWayfinding.load(element, librarySettings);
      console.log(`ATAG: call to load finished with result: ${JSON.stringify(wyfResponse)}`);
      // Map interactions:
      // 1) POIs callback:
      SitumWayfinding.onPoiSelected((result: OnPoiSelectedResult) => {
        console.log("On poi selected callback!");
        console.log(JSON.stringify(result));
        this.presentToast(`Selected ${result.poiName} at ${result.buildingName}`);
      });
      SitumWayfinding.onPoiDeselected((result: OnPoiDeselectedResult) => {
        console.log("On poi selected callback!");
        console.log(JSON.stringify(result));
        this.presentToast(`Deselected poi at ${result.buildingName}`);
      });
      // 2) Floor callback:
      SitumWayfinding.onFloorChange((result: OnFloorChangeResult) => {
        console.log("On floor change callback!");
        console.log(JSON.stringify(result));
        this.presentToast(`Floor changed from ${result.fromFloorName} to ${result.toFloorName}`);
      });
      // 3) Center POI:
      if (this.autostartMode == "centerPoi"){
        this.centerPoi();
      } else if (this.autostartMode == "navToPoi") {
        this.navToPoi();
      } else if (this.autostartMode == "navToLocation") {
        this.navToLocation();
      }

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

  async presentToast(text: string) {
    console.log('Call to presentToast()');
    /*const toast = await this.toastController.create({
      message: text,
      duration: 1500
    });
    toast.present();*/
    //alert(text);
  }

  async switchCaptureEvents() {
    this.captureTouchEvents = !this.captureTouchEvents;
    SitumWayfinding.setCaptureTouchEvents({
      captureEvents: this.captureTouchEvents
    });
  }

  async toggleOuterHTML() {
    this.showOuterHTML = !this.showOuterHTML;
    const oldClass = this.showOuterHTML ? "out" : "in";
    const newClass = this.showOuterHTML ? "in" : "out";
    const e = document.getElementById("outerHTML");
    e?.classList.remove(oldClass);
    e?.classList.add(newClass);
  }

  async onAutostartModeChanged(target: any) {
    if (target && target.value) this.autostartMode = target.value;
  }

  async centerPoi() {
    await SitumWayfinding.selectPoi({ 
      id: MY_POI_ID,
      buildingId: MY_BUILDING_ID
     });
  }

  async centerBuilding() {
    await SitumWayfinding.selectBuilding({ id: MY_BUILDING_ID });
  }

  async navToPoi() {
    await SitumWayfinding.navigateToPoi({ 
      id: MY_POI_ID,
      buildingId: MY_BUILDING_ID
     });
  }

  async navToLocation() {
    await SitumWayfinding.navigateToLocation({ 
      buildingId: MY_BUILDING_ID,
      floorId: MY_FLOOR_ID,
      latitude: MY_NAV_POINT_LAT,
      longitude: MY_NAV_POINT_LNG 
     });
  }

  async stopPositioning() {
    await SitumWayfinding.stopPositioning();
  }
}


