import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectDetailsService } from 'src/app/shared/services/project-details.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MapComponent implements OnInit, OnDestroy {
  tags = [
    {
      label: 'Back Left',
      type: 'Point',
    },
    {
      label: 'For Stewart',
      type: 'Point',
    },
    {
      label: 'Bike Route',
      type: 'Point',
    },
    {
      label: 'University yard',
      type: 'Point',
    },
    {
      label: 'Road',
      type: 'Point',
    },
    {
      label: 'Bus stop',
      type: 'Point',
    },
    {
      label: 'Park',
      type: 'Point',
    },
    {
      label: 'Bike route',
      type: 'Point',
    },
    {
      label: 'University yard',
      type: 'Point',
    },
    {
      label: 'Road',
      type: 'Point',
    },
  ];

  categories = ['For Stewart'];
  subCategories = ['For Stewart'];
  offsetMetrics = ['Meters', 'Miles'];
  icons = ['Map Point'];

  tutorials = [
    {
      label: 'Queue',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Circularly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Doubly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Singly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Doubly Ended Queue',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Binary Search Tree',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Red Black Tree',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Breadth First Search',
      color: 'warning',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: "Floyd's Cycle",
      color: 'info',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Travelling Salesman Problem',
      color: 'info',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Bellman Ford',
      color: 'warning',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'KMP info',
      color: 'String',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
  ];

  cols = [
    { field: 'label', header: 'Label' },
    { field: 'color', header: 'Color' },
    { field: 'icon', header: 'Icon' },
  ];

  detailIcons = [
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
  ];

  sortBy = ['Name'];

  projectDetails: any = {};
  subscriptions: Subscription[] = [];
  isAccordionOpen: boolean = false;

  constructor(
    public projectDetailsService: ProjectDetailsService,
    public sidenavService: SidenavService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dashboardService
        .getProjectById(2)
        .subscribe((data) => (this.projectDetails = data))
    );
  }

  test(that: any) {
    console.log(that);
  }

  setAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
