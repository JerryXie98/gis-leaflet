// import React, {Component} from 'react';
// import './App.css';
// import {Map, Marker, Popup, TileLayer, CircleMarker} from 'react-leaflet';
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {currentZoomLevel: 13};
//   }
//
//   componentDidMount() {
//     const leafletMap = this.leafletMap.leafletElement;
//     console.log(this.leafletMap);
//     leafletMap.on('zoomend', () => {
//       const updatedZoomLevel = leafletMap.getZoom();
//       this.handleZoomLevelChange(updatedZoomLevel);
//     });
//   }
//
//   handleZoomLevelChange(newZoomLevel) {
//     this.setState({currentZoomLevel: newZoomLevel});
//   }
//
//   handleUpPanClick() {
//     const leafletMap = this.leafletMap.leafletElement;
//     leafletMap.panBy([0, -100]);
//     window.console.log('Panning up');
//   }
//
//   render() {
//     window.console.log(
//       'this.state.currentZoomLevel ->',
//       this.state.currentZoomLevel
//     );
//     const position = [51.505, -0.09];
//     const position2 = [51.509, -0.09];
//     return (
//       <div>
//         <Map
//           center={position}
//           zoom={this.state.currentZoomLevel}
//           style={{width: '100%', height: '500px'}}
//           ref={m => {
//             this.leafletMap = m;
//           }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           />
//           <Marker position={position}>
//             <Popup>
//               <span>
//                 A pretty CSS3 popup.<br />Easily customizable.
//               </span>
//             </Popup>
//           </Marker>
//           <Marker position={position2}>
//             <Popup>
//               <span>
//                 A pretty CSS3 popup.<br />Easily customizable.
//               </span>
//             </Popup>
//           </Marker>
//           <CircleMarker center={[51.51, -0.12]} color="red" radius={20}>
//             <Popup>
//               <span>
//                 A pretty CSS3 popup.<br />Easily customizable.
//               </span>
//             </Popup>
//           </CircleMarker>
//         </Map>
//         <span>hello world</span>
//         <button onClick={() => this.handleUpPanClick()}>Click me </button>
//       </div>
//     );
//   }
// }
//
// export default App;

import React, {Component} from 'react';
import './App.css';
import L from 'leaflet';
import esri from 'esri-leaflet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentZoomLevel: 13, map: null, tileLayer: null};
  }

  componentDidMount() {
    this.init();
  }

  async changeZoom() {
    await this.setState({currentZoomLevel: 1});
    console.log(this._mapNode);
    L.marker([51.505, -0.092]).addTo(this.state.map);
    this.state.map.zoomIn();
  }

  init() {
    const position = [51.505, -0.09];
    const map = L.map(this._mapNode).setView(
      position,
      this.state.currentZoomLevel
    );

    const tileLayer = esri.basemapLayer('Topographic').addTo(map);

    this.setState({map, tileLayer});
    window.myMap = map;
    L.marker(position)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');
  }

  render() {
    window.console.log(
      'this.state.currentZoomLevel ->',
      this.state.currentZoomLevel
    );
    return (
      <div>
        <div
          ref={node => (this._mapNode = node)}
          id="map"
          style={{width: '100%', height: '400px'}}
        />
        <span> hello</span>
        <button onClick={() => this.changeZoom()}>Change Zoom</button>
      </div>
    );
  }
}

export default App;
