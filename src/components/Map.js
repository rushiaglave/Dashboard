import L from "leaflet";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "leaflet.heat/dist/leaflet-heat.js"; // Import Leaflet.heat plugin
import iconUrl from "../img/iconPerson.png"; // Import markers
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"; // fullscree function of leaflet
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"; // fullscree function of leaflet
import legend from "../img//Legend.jpeg";
import puneAdminBoundary from "./pmcAdminBoundary.json"; // Import your GeoJSON file
import "./map.css";

const HeatmapComponent = ({ selectedYear }) => {
  const mapRef = useRef(null); // Ref to hold the map instance
  const markersRef = useRef(null); // Ref to hold the marker layer group

  useEffect(() => {
    const fetchDataAndPlotHeatmap = async () => {
      try {
        const url = "http://127.0.0.1:8000/policest-list/";
        const response = await fetch(url);
        const fetchedData = await response.json();

        const filteredData = fetchedData.filter(
          (item) => item.year === selectedYear
        );

        const dataPoints = filteredData.map((item) => [
          item.latitude,
          item.longitude,
          item.count,
        ]);

        if (!mapRef.current) {
          mapRef.current = L.map("map", { fullscreenControl: true }).setView(
            [18.529662422691015, 73.87978257625505],
            10
          );

          // Create an object to hold your basemaps
          const basemaps = {
            OpenStreetMap: L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              {
                attribution: "&copy; OpenStreetMap contributors",
              }
            ),
            // "CartoDB Positron": L.tileLayer(
            //   "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            //   {
            //     attribution: "&copy; CartoDB",
            //   }
            // ),
            Esri_WorldImagery: L.tileLayer(
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              {
                attribution:
                  "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
              }
            ),

            Dark_Basemap: L.tileLayer(
              "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
              {
                attribution:
                  '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                ext: "png",
              }
            ),

            Esri_Gray_Basemap: L.tileLayer(
              "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
              {
                attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
                maxZoom: 16,
              }
            ),

            Stadia_Grey: L.tileLayer(
              "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}",
              {
                minZoom: 0,
                maxZoom: 20,
                attribution:
                  '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                ext: "png",
              }
            ),

            // Add more basemaps here as needed
          };

          // Create a layer group for markers
          markersRef.current = L.layerGroup();

          // Add the basemap control
          const layerControl = L.control
            .layers(
              basemaps,
              { Markers: markersRef.current },
              { className: "custom-layer-control" }
            )
            .addTo(mapRef.current);

          // Add the default basemap to the map
          basemaps["Stadia_Grey"].addTo(mapRef.current);

          // Create GeoJSON layer with custom style
          const geoJSONLayer = L.geoJSON(puneAdminBoundary, {
            style: {
              color: "orange", // Change the border color of the GeoJSON features
              fillColor: "#ff9f1c", // Change the fill color of the GeoJSON features
              fillOpacity: 0.1, // Adjust the opacity of the fill color
              weight: 1, // Adjust the border thickness of the GeoJSON features
            },
          }).addTo(mapRef.current);

          // Add the GeoJSON layer to the layer control
          layerControl.addOverlay(geoJSONLayer, "Admin Boundary");
        }

        // Define custom gradient colors
        const gradientColors = {
          0.3: "blue", // Low intensity, cooler color
          1.0: "red", // Highest intensity, warmer color
          0.8: "#FEA619",
          0.6: "#F64D74",
          0.4: "#77787B",
        };

        // Add heatmap layer
        const heatmapLayer = L.heatLayer(dataPoints, {
          gradient: gradientColors,
        });

        // Add heatmap layer to the map
        heatmapLayer.addTo(mapRef.current);

        // Create a custom icon
        const customIcon = L.icon({
          iconUrl: iconUrl, // Specify the URL of your custom icon
          iconSize: [25, 25], // Specify the size of the icon
        });

        // Clear existing markers
        markersRef.current.clearLayers();

        // Add markers for each point to the marker layer group
        filteredData.forEach((point) => {
          const marker = L.marker([point.latitude, point.longitude], {
            icon: customIcon,
          }).addTo(markersRef.current);

          // Create a popup for each marker
          const popupContent = `<b>Police Station:</b> ${point.police_station}<br/><b>Case Count:</b> ${point.count}`;
          marker.bindPopup(popupContent);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndPlotHeatmap();
  }, [selectedYear]); // Empty dependency array ensures effect runs only once after initial render

  return (
    <div id="map" style={{ position: "relative",height:"335px" }}>
      <div style={{ height:"100%",width:"100%" }}>
      <img
        src={legend}
        alt="legend"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          width: "15%",
          height: "auto",
          zIndex: 1001,
          opacity: 0.9,
        }}
      />
      </div>
    </div>
  );
};

export default HeatmapComponent;
