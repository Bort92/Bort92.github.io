<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>ArcGIS Web Map</title>
    <style>
      html, body, #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
      }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.15/esri/css/main.css">
    <script src="https://js.arcgis.com/4.15/"></script>
    <script src="yourScript.js"></script> <!-- replace with your JavaScript file -->
  </head>
  <body>
    <div id="viewDiv"></div>
  </body>
</html>

require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Attachments"
  ], function(WebMap, MapView, FeatureLayer, LayerList, Attachments) {
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
  