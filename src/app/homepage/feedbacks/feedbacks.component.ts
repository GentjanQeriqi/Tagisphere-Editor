import { Component, HostListener } from '@angular/core';
import { FEEDBACK_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent {
  FEEDBACK_WORDS = FEEDBACK_WORDS;
  screenWidth: number = 0;
  isDesktop = this.screenWidth > 428;

  constructor() {
    this.getScreenSize();
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 4,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 4,
    },
  ];
  users = [
    {
      title: 'One of the greatest service',
      content: `Geo-anchored data to unlock persistent AR graphics is a tremendous opportunity in everything from 
        asset management to gaming. AR Mavericks addresses this in a platform that utilizes enterprises' 
        existing asset data for fast and easy implementation. We can't wait to see what they bring to market.`,

      stars: 5,
      username: 'Mike Boland',
      imageUrl: 'assets/images/mike_boland.png',
    },
    {
      title: 'One of the greatest service',
      content: `Getting the best information as simply and as fast as possible to those that need it is an 
       important business tool across many industries.  The Tagisphere platform is an 
       amazing example of how easy it can be to get this information in the right hands incredibly 
       fast and easily.  The ability to plug-in to existing user platforms adds so much value to the 
       adopters of this great technology!  I can't wait to see how Industry adopts this tech in 
       different ways. `,
      stars: 5,
      username: 'Mark Steggall ',
      imageUrl: 'assets/images/william_wallace_head_small_720.png',
    },
    {
      title: 'One of the greatest service',
      content: `I see a huge opportunity for AR to provide real-time access to the metadata behind located assets. 
        Leveraging location intelligence in this manner can deliver on the promise of the Digital Twin for the 
        built-world enterprise.`,
      stars: 5,
      username: 'Bill Wallace ',
      imageUrl: 'assets/images/bill_walllace.png',
    },
  ];

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}
