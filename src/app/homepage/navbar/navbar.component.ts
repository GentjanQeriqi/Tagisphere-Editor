import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NAVBAR_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(private router: Router) {}
  NAVBAR_WORDS = NAVBAR_WORDS;

  ngOnInit(): void {
    this.items = [
      {
        label: this.NAVBAR_WORDS.HOME,
      },
      {
        label: this.NAVBAR_WORDS.SUBSCRIBERS,
      },
      {
        label: this.NAVBAR_WORDS.COMPANY,
      },
      {
        label: this.NAVBAR_WORDS.CONTANCT,
      },
      {
        label: 'Sign In',
        command: () => {
          this.router.navigate(['/auth']);
        },
      },
    ];
  }
}
