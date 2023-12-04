require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Attachments",
    "esri/identity/IdentityManager"
  ], function(WebMap, MapView, FeatureLayer, LayerList, Attachments, IdentityManager) {
  
    IdentityManager.registerOAuthInfos([{
      appId: "rLMgQSOnVhjpZUI2",  // replace with your app id
      portalUrl: "https://horizonsrc.maps.arcgis.com"  // replace with your organization's URL
    }]);
  
    var webmap = new WebMap({
        portalItem: {
          id: "341248e420144a8a9fe2f4ac4065d199",
          apiKey:"AAPK7e43c4ab59e2403ab56144750045a6abA7OjBlbqZA2lDrLq0uFLvI9NmC1zK1UkctlwBUmUT8WOEgKKxUbkTDfv8oQ02uFJ"
        }
    });
  
    var view = new MapView({
      container: "viewDiv",
      map: webmap
    });
  
    var layer = new FeatureLayer({
      url: "https://services1.arcgis.com/VuN78wcRdq1Oj69W/arcgis/rest/services/KKT_Community_Projects/FeatureServer", // replace with your layer URL
      featureReduction: {
        type: "cluster"
      },
      outFields: ["*"]
    });
  
    webmap.add(layer);
  
    var layerList = new LayerList({
      view: view
    });
  
    view.ui.add(layerList, "top-right");
  
    var attachments = new Attachments({
      view: view,
      layer: layer
    });
  
    view.ui.add(attachments, "bottom-right");
});
