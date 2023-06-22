import { Component } from '@angular/core';
import { ABOUT_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  ABOUT_WORDS = ABOUT_WORDS;
}
