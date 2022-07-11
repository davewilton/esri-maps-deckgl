// esri
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

// deck.gl
import {DeckLayer} from '@deck.gl/arcgis';
import { ScatterplotLayer, ScatterplotLayerProps } from "@deck.gl/layers";

const loadMap = () => {

  console.log("load map");

  const layerOptions: ScatterplotLayerProps<unknown> = {
    id: 'a', 
    data: './static/stations.json',
    getPosition: (d: any) => [parseFloat(d.longitude), parseFloat(d.latitude)],
    getRadius: (d: any) => parseInt(d.capacity),
    stroked: true,
    getFillColor: [255, 133, 27],
    getLineColor: [255, 38, 27],    
    radiusMinPixels: 5,
    radiusMaxPixels: 50
  }
  const scatterplotLayer = new ScatterplotLayer(layerOptions);
  
  const layer = new DeckLayer({
    'deck.layers': [
      scatterplotLayer
    ]
  });

  const map = new Map({
    basemap: "dark-gray", 
    layers: [layer as any]
  });

  const center = { lat: 40.75097, lng: -73.98765 }
  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [center.lng, center.lat], 
    zoom: 14
  });

  
}

loadMap();