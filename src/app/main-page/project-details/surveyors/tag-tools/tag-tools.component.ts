import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagCategory, Tags } from 'src/app/shared/interfaces/tags.interface';
import { TagToolsService } from 'src/app/shared/services/tag-tools.service';
import { TagToolsDialogComponent } from './tag-tools-dialog/tag-tools-dialog.component';
import { LngLatBoundsLike } from 'mapbox-gl';
import { Menu } from 'primeng/menu';
import { DialogDataService } from 'src/app/shared/services/dialog-data.service';
import * as _ from 'lodash';
import { ConfirmationService, ConfirmEventType, MessageService  } from 'primeng/api';


@Component({
  selector: 'tag-tools',
  templateUrl: './tag-tools.component.html',
  styleUrls: ['./tag-tools.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TagToolsComponent implements OnInit, AfterViewInit {

  @ViewChild('focusedDiv') focusedDiv!: ElementRef;


  dialogRef: DynamicDialogRef | undefined;
  tagPropertiesMenu!: Menu;
  tags: Tags[] = [];
  showOverlay: boolean = false;
  toggleTagProps: boolean = false;
  icons = [
    { id: 1, name: 'Map Point', src: 'assets/images/Group32696.png' },
    { id: 2, name: 'Map Point', src: 'assets/images/MapPinIcon.png' },
    { id: 3, name: 'Map Point', src: 'assets/images/MapPinIcon.png' }
  ];
  items = [
    {
      label: 'Edit Tag',
      icon: 'pi pi-fw pi-pencil',
      command: (event: any) => {
        this.openEdit(this.selectedTag);
      }
    },
    {
      label: 'Tag Properties',
      icon: 'pi pi-fw pi-list',
      command: (event: any) => {
        this.showMarkerPopup(this.selectedTag)
      }
    },
    {
      label: 'Delete',
      icon: 'pi pi-fw pi-trash',
      command: (event: any) => {
        this.confirmDelete();
      }
    }
  ]
  map!: mapboxgl.Map;
  style = 'mapbox://s tyles/mapbox/streets-v11';

  tagPopup!: mapboxgl.Popup;
  showDialog: boolean = false;
  tagForm: FormGroup = new FormGroup({});
  selectedIcon: any;
  selectedTag: any;
  categories: TagCategory[] = [];
  subCategories: TagCategory[] = [] 
  offsetType = [{ name: 'Kilometers' }, { name: 'Meters' }];
  markers!: mapboxgl.Marker
  selectedCategory!: number

  constructor(private fb: FormBuilder,
    private tagToolsService: TagToolsService,
    private router: Router,
    private dialogDataService: DialogDataService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.buildTagForms();
    this.getCategories();

  }

  buildTagForms() {
    this.tagForm = this.fb.group({
      name: new FormControl(null),
      project: new FormControl(null),
      additional_data: new FormControl(null),
      category: new FormControl(null),
      latitude: new FormControl(null),
      longitude: new FormControl(null),
      entries: new FormArray([
        new FormGroup({
          name: new FormControl('string'),
          hyperlink: new FormControl(''),
          entry_type: new FormControl('LINK'),
          entry_value: new FormControl('string')
        })
      ]),
      icon: new FormControl(null),
      offset: new FormControl(null)
    });
    const iconctrl = this.tagForm.get('icon')
    iconctrl?.disable()
  }
  get entries(): FormArray {
    return this.tagForm.get('entries') as FormArray;
  }

  
  ngAfterViewInit(): void {
    this.initMap();
    this.getTags();
  }

  getCategories() {
    const url = this.router.parseUrl(this.router.url)
    const id = url.root.children['primary'].segments[3]
    this.tagToolsService.getCategories(Number(id)).subscribe((next: any) => {
      this.categories = next;
      const foundItem: any = this.categories.filter((item: TagCategory) => item.level === 1);
      this.categories = foundItem;
    })
  }

  getTags() {
    const url = this.router.parseUrl(this.router.url)
    const id = url.root.children['primary'].segments[3]
    this.tagForm.patchValue({ project: Number(id) });
    this.tagToolsService.getTags(Number(id)).subscribe((next: Tags[]) => {
      this.tags = next
      this.resetMapBounds();
      // this.tags.forEach(tag => {
      //   this.addMarker(tag.location.coordinates)
      // })

    })
  }

  initMap() {
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibWF2ZXJpY2tzLWRldiIsImEiOiJjbGdpYTZsbnUwM2N4M2NvYjdmczNwaWhyIn0.ZmEPtsJC2ch7sju_c75Sow',
      container: 'map1',
      style: this.style,
      zoom: 2,
      center: [
        -97.95474148322099,
        40.88120859925914
    ]
    });

    


    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    const bounds = new mapboxgl.LngLatBounds();
    this.map.on('load', () => {
      setTimeout(() => {
        this.tags.forEach(tag => {
          bounds.extend(tag.location.coordinates);
          this.map.fitBounds(bounds, {
            padding: 50, // Optional padding around the bounds
            maxZoom: 15, // Optional maximum zoom level
          });
          let markerOptions: mapboxgl.MarkerOptions = {
            draggable: true,
            element: this.createMarkerElement(tag.icon, tag)
          };
          this.markers = new mapboxgl.Marker(markerOptions)
            .setLngLat(tag.location.coordinates)
            .addTo(this.map);
            this.markers.setDraggable(true);
            this.markers.getElement().addEventListener('click', () => {
            this.openEdit(tag);
          });
          this.markers.on('dragend', (e: any) => {
            const newCoordinates = e.target._lngLat; 
            this.confirmChangeLocation(tag, newCoordinates);
          });
        });
      }, 200);
    });
    this.map.on('click', (e) => {
      if (this.showOverlay) {
        this.openModal(e)
      }
    }

    );
  }

  openModal(event: any) {
    this.buildTagForms();
    const url = this.router.parseUrl(this.router.url)
    const id = url.root.children['primary'].segments[3]
    this.tagForm.patchValue({ project: Number(id) });
    this.showDialog = true
    this.focusedDiv.nativeElement.setAttribute('style', 'z-index: 99');
    this.showOverlay = false;
    this.cdRef.detectChanges();
    const latForm = this.tagForm.get('latitude');
    const lngForm = this.tagForm.get('longitude');
    latForm?.patchValue(event.lngLat.lat);
    lngForm?.patchValue(event.lngLat.lng);
    

  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
    this.cdRef.detectChanges()
    if (this.showOverlay) {
      this.focusedDiv.nativeElement.setAttribute('style', 'z-index: 9999');
    }
  }

  saveTag() {
    const latForm = this.tagForm.get('latitude')?.value;
    const lngForm = this.tagForm.get('longitude')?.value;
    const coordinates = [lngForm, latForm] as mapboxgl.LngLatLike
    this.tagToolsService.saveTag(this.tagForm.value).subscribe(next => {
      this.getTags();
      this.addMarker(next.location.coordinates, next);
      this.showDialog = false;
    });

  }


  addMarker(coordinates: mapboxgl.LngLatLike, tag: Tags) {
    let markerOptions: mapboxgl.MarkerOptions = {
      draggable: true
    };

    markerOptions = {
      ...markerOptions,
      element: this.createMarkerElement(tag.icon, tag)
    };
    this.markers = new mapboxgl.Marker(markerOptions).remove()
      .setLngLat(coordinates)
      .addTo(this.map);
    this.markers.setDraggable(true);
    this.markers.getElement().addEventListener('click', (e) => {
      this.openEdit(tag);
    });
    this.markers.on('dragend', (e: any) => {
      const newCoordinates = e.target._lngLat;
  
      this.confirmChangeLocation(tag, newCoordinates);
    });
  }


  createMarkerElement(iconName: any, tag?: Tags): HTMLElement {
    const markerElement = document.createElement('div');
    markerElement.innerHTML = `<p class="bg-green-500 text-white rounded-md text-center absolute top-[31px] p-1 text-xs leading-3">${tag?.name}</p>`;
    markerElement.className = 'marker';
    markerElement.style.backgroundImage = `url(${this.icons[iconName]?.src ? this.icons[iconName]?.src : 'assets/images/MapPinIcon.png'})`;
    markerElement.style.width = '30px';
    markerElement.style.height = '30px';
    return markerElement;
    
  }

  showMarkerPopup(tag: Tags ) {
    const coordinates = tag.location.coordinates;
    
    const popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `
        <div class="p-2">
        <h3 class="font-semibold pb-3">${tag.name }  Properties</h3>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Type: </p>
        <p>${tag.location.type}</p>
        </div>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Location: </p>
        <p>${tag.location.coordinates}</p>
        </div>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Created: </p>
        <p>${new Date(tag.created_at).toDateString() }</p>
        </div>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Update: </p>
        <p>${new Date(tag.updated_at).toDateString()}</p>
        </div>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Score: </p>
        <p>${tag.score}</p>
        </div>
        <div class="flex flex-row justify-between gap-4 pb-2">
        <p>Visit Count: </p>
        <p>${tag.visit_count}</p>
        </div>
        </div>
        `
        )
      .addTo(this.map);
    // Close the popup when the marker is clicked again
  
  }

  setItem(tag: any, event: any) {
    event.stopPropagation()

    this.selectedTag = tag
  }

  deleteTag() {
    this.tagToolsService.deleteTag(this.selectedTag.id).subscribe(next => {
      this.getTags();
      this.initMap()
    })
  }

  openEdit(tag: Tags) {
    if(!this.showOverlay){

    const dialogRef = this.dialogService.open(TagToolsDialogComponent, {
      header: 'Tag Editor',
      width: '30%',
      data: tag
    }
    )
    dialogRef?.onClose.subscribe( (next:Tags) => {
      _.remove(this.tags, {id: next.id});
      this.tags.unshift(next)
      this.addMarker(next?.location?.coordinates, {...next});
        this.initMap()
    });
    }
  }

  flyToLocation(tag: Tags) {
    const latlng = tag.location.coordinates
    this.map.flyTo({ center: latlng, zoom: 10 })
  }


  resetMapBounds() {
    // Retrieve the coordinates of all the markers
    const markerCoordinates: LngLatBoundsLike[] = this.tags.map(marker => marker.location.coordinates);

    // Calculate the bounds that encompass all the marker coordinates
    const bounds = new mapboxgl.LngLatBounds();
    markerCoordinates.forEach(coord => bounds.extend(coord));

    // Fit the map to the bounds
    this.map.fitBounds(bounds, {
      padding: 50, // Optional padding around the bounds
      maxZoom: 15 // Optional maximum zoom level
    });
  }


  confirmDelete() {
    this.confirmationService.confirm({
        message: `Do you want to delete tag: ${this.selectedTag.name} `,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.deleteTag();
        },
        reject: (type: any) => {
        }
    });
}

confirmChangeLocation(tag: Tags, newCoordinates: any){
  this.confirmationService.confirm({
    message: `Do you want to relocate tag: ${tag.name}`,
    header: 'Relocate the Tag',
    icon: 'pi pi-info-circle',
    accept: () => {
  
      tag.location.coordinates = [ newCoordinates.lng, newCoordinates.lat] 
        this.tagToolsService.updateTag(tag, tag.id).subscribe(next => {
            this.resetMapBounds()
        })
    },
    reject: (type: any) => {
      this.initMap()
    }
});
}

categoryChanged(event: any){
  if(event){
  const foundItem: any = this.categories.find((item: TagCategory) => item.id === event);
  this.subCategories = foundItem?.children;
}
}

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.showOverlay) {
      this.showOverlay = !this.showOverlay
      this.focusedDiv.nativeElement.setAttribute('style', 'z-index: 99');
    
      this.tagPopup.remove();

    }
  }




}
