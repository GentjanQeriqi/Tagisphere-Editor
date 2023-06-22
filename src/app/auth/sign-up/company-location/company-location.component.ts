import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJSONSource, LngLat } from 'mapbox-gl';

export interface OrgLocation{
  type: string;
  coordinates: number[]
}


@Component({
  selector: 'app-company-location',
  templateUrl: './company-location.component.html',
  styleUrls: ['./company-location.component.scss']
})
export class CompanyLocationComponent implements OnInit{

  @Output() orgLocation = new EventEmitter<OrgLocation>();
  canvas!: HTMLElement;
  @ViewChild('mapElement') mapElement!: ElementRef;
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 26.3398;
  lng = -81.7787;
  geojson: any = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [-81.7787, 26.3398 ]
        }
      }
    ]
  };
  pointIsDragging: boolean = false

ngOnInit(): void {
  this.initMap()
}

  initMap() {

    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibWF2ZXJpY2tzLWRldiIsImEiOiJjbGdpYTZsbnUwM2N4M2NvYjdmczNwaWhyIn0.ZmEPtsJC2ch7sju_c75Sow',
      container: 'map',
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.canvas = this.map.getCanvasContainer();

    this.map.on('load', () => {
      // Add a single point to the map.
      this.map?.addSource('point', {
        'type': 'geojson',
        'data': this.geojson
      });

      this.map?.addLayer({
        'id': 'point',
        'type': 'circle',
        'source': 'point',
        'paint': {
          'circle-radius': 10,
          'circle-color': '#F84C4C' // red color
        }
      });

      // When the cursor enters a feature in
      // the point layer, prepare for dragging.
      this.map?.on('mouseenter', 'point', () => {
        this.map?.setPaintProperty('point', 'circle-color', '#3bb2d0');
        this.canvas.style.cursor = 'move';
        });

      this.map?.on('mouseleave', 'point', () => {
        this.map?.setPaintProperty('point', 'circle-color', '#3887be');
        this.canvas.style.cursor = '';
      });

      this.map?.on('mousedown', 'point', (e) => {
        e.preventDefault();
        this.pointIsDragging = true;
 
         this.canvas.style.cursor = 'grab';
         
        this.map?.on('mousemove', this.onMove.bind(this));
        this.map?.on('mouseup', (e) => {
          if (this.pointIsDragging) {
            this.pointIsDragging = false;
            this.canvas.style.cursor = '';
            const outputObject: OrgLocation = { 
              coordinates:[e.lngLat.lat, e.lngLat.lng],
              type: 'Point'
            }
            this.orgLocation.emit(outputObject);
            this.map?.off('mousemove', this.onMove.bind(this));
          }
        });
      });

      this.map?.on('touchstart', 'point', (e) => {
        if (e.points.length !== 1) return;
        e.preventDefault();
        this.map?.on('touchmove', this.onMove.bind(this));
        this.map?.once('touchend', this.onUp.bind(this));
      });
    });
  }

  onMove(event: any) {
    if (!this.pointIsDragging) {
      return;
    }
    const coords = event.lngLat;
    // Set a UI indicator for dragging.
    this.canvas.style.cursor = 'grabbing';
  
    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    (this.geojson.features[0].geometry as any).coordinates = [coords.lng, coords.lat];
    const src =  this.map?.getSource('point') as GeoJSONSource
    src.setData(this.geojson);
  }

    onUp(e: any): any{
      const coords = e.lngLat;
    
       
      // Print the coordinates of where the point had
      // finished being dragged to on the map.
      // coordinates.style.display = 'block';
      // coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;
      this.canvas.style.cursor = '';
       
      // Unbind mouse/touch events
      this.map?.off('mousemove', this.onMove.bind(null));
      this.map?.off('mouseup', this.onMove);
      this.map?.off('touchmove', this.onMove.bind(null));
      this.pointIsDragging = false;

     return coords

      }
}
