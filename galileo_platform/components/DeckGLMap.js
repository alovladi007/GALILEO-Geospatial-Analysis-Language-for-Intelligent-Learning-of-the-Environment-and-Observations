import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";

const DATA = [
  { position: [-122.45, 37.78], size: 100 },
  { position: [-74, 40.71], size: 80 },
  { position: [2.35, 48.85], size: 90 },
];

const scatterLayer = new ScatterplotLayer({
  id: "scatterplot-layer",
  data: DATA,
  getPosition: (d) => d.position,
  getRadius: (d) => d.size,
  getColor: [0, 255, 140],
  radiusMinPixels: 5,
  pickable: true,
});

export default function DeckGLMap() {
  // Use a public map style that doesn't require a token
  return (
    <DeckGL
      initialViewState={{ longitude: 0, latitude: 20, zoom: 1.5, pitch: 30 }}
      controller={true}
      layers={[scatterLayer]}
      style={{ width: "100%", height: "600px" }}
    >
      <Map
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </DeckGL>
  );
}