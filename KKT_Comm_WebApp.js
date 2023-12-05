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
  
    const clusterConfig = {
      type: "cluster",
      clusterMinSize: "24px",  // increased from "16.5px"
      popupTemplate: {
        title: "Cluster Summary",
        content: "This cluster represents <b>{cluster_count}</b> features.",
        fieldInfos: [{
          fieldName: "cluster_count",
          format: {
            places: 0,
            digitSeparator: true
          }
        }]
      },
      labelingInfo: [{
        deconflictionStrategy: "none",
        labelExpressionInfo: {
          expression: "Text($feature.cluster_count, '#,###')"
        },
        symbol: {
          type: "text",
          color: "white",
          font: {
            weight: "bold",
            family: "Noto Sans",
            size: "12px"
          }
        },
        labelPlacement: "center-center",
      }]
    };
  
    var layer = new FeatureLayer({
      url: "https://services1.arcgis.com/VuN78wcRdq1Oj69W/arcgis/rest/services/KKT_Community_Projects/FeatureServer",
      featureReduction: clusterConfig,
      outFields: ["*"],
      popupTemplate: {
        title: "{District}",
        content: "This point represents a project in the {District} district."
      }
    });
  
    webmap.add(layer);
  
    var layerList = new LayerList({
      view: view
    });
  
    view.ui.add(layerList, "top-right");
  
    view.when(function() {
      var attachments = new Attachments({
        view: view,
        layer: layer
      });
  
      view.ui.add(attachments, "bottom-right");
    });

view.on("click", function(event) {
  view.hitTest(event).then(function(response) {
    var result = response.results.filter(function(result) {
      return result.graphic.layer === layer;
    })[0];
    if (result) {
      view.popup.open({
        features: [result.graphic],
        location: event.mapPoint
      });
    }
  });
});
