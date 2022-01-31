<template>
  <div id="body">
    <div class="col">
      <div id="myHeader" @click="webClick('header')"><p>Some kind of header</p></div>
      <div ref="situm-map" style="background: #9cd3a3" @click="startMap('situm-map')">
        <div id="mapOverlay" @click="webClick('map overlay'); grow();"><p>HTML over native map</p></div>
      </div>
      <div id="myFooter" @click="webClick('footer')">
        <p id="myLog">Some kind of footer</p>
        <button @click="unload()">Unload</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SitumWayfinding } from 'situm-capacitor-plugin-wayfinding';
import Constants from './app.constants.json';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    async startMap(refName) {
      // find element where element should be attached to
      const element = this.$refs[refName];
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
    },
    async unload() {
      await SitumWayfinding.unload();
    },
    async webClick(elementName) {
      alert(`You just clicked the ${elementName}`);
    },
    async grow() {
      let element = document.getElementById("mapOverlay");
      element.classList.add("big");
    }
  },
};
</script>

<style>
body {
  margin: 0;
}

div {
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
}

#body {
  height: 100vh;
  width: 100vw;
  color: #000;
}

.col {
  display: flex;
  flex-direction: column;
}

#myHeader {
  background: #7ac1d5;
  height: 100px;
}

#myFooter {
  background: #eab6a7;
  height: 100px;
}

#mapOverlay {
  position: absolute;
  height: 80px;
  width: 100px;
  top: 80px;
  right: 10px;
  background: #c6dca0;
  transition:all 0.8s ease;
}

#mapOverlay.big {
  height: 120px;
  width: 200px;
}
</style>
