import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { SUPPORT_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SupportComponent {
  SUPPORT_WORDS = SUPPORT_WORDS;

  screenWidth: number = 0;
  isDesktop = this.screenWidth > 428;
  isActive: boolean = false;

  questionsAnswers: { question: string; answer: string; expanded: boolean }[] =
    [
      {
        question: 'What is the Tagisphere?',
        expanded: false,
        answer: `The Tagisphere is the name we use to describe the global space where your Augmented Reality (AR)
    tags live. It is a hidden global layer of information with hyperlinked tags. You just need to use Tagis
    Mobile on your smart phone or tablet to look into the Tagisphere and find any information you need.`,
      },

      {
        question: 'Why would I want to use this solution?',
        expanded: false,
        answer: `If you have field workers who need to find information about assets or locations in the field, you can
    use the Tagisphere to hyperlink your world for those workers. They just need to use Tagis Mobile to look
    into the Tagisphere and find all the information they need.`,
      },

      {
        question: 'What is an AR tag?',
        expanded: false,
        answer: `An AR tag is an Augmented Reality (AR) map pin that is shown at a specified location on the earth. AR
    technology add new graphics to the camera view of a mobile device. Our AR tags are shown at a specific
    latitude\longitude (location) as a map pin graphic with a label (name) and a hyperlink. It lest users find
    information about tagged locations.`,
      },

      {
        question: 'What is the Tagisphere?',
        expanded: false,
        answer: `The Tagisphere is the name we use to describe the global space where your Augmented Reality (AR)
    tags live. It is a hidden global layer of information with hyperlinked tags. You just need to use Tagis
    Mobile on your smart phone or tablet to look into the Tagisphere and find any information you need.`,
      },

      {
        question: 'What is the basic operation or concept of this solution?',
        expanded: false,
        answer: `This system lets you publish Augmented Reality (AR) tags to any location on the earth so people can
    find information near them. These tags show up for users of Tagis Mobile as Augmented Reality map
    pins in the real world at the location you placed them. The app user sees the pin and a label (name). If
    you provided a hyperlink, they click on the pin and access any cloud-based location you linked.`,
      },

      {
        question: 'What is the workflow to use this system?',
        expanded: false,
        answer: `The workflow of this system is as follows.
    1. Create an Administrator account.
    2. Start a project (type of your choice).
    3. Create some AR tags using the method provided for the various types of projects.
    a. Each tag is placed at a specific location on the earth using a map or other method,
    depending on the project type.
    4. Invite private users if you are publishing private data.
    5. Field users need to install Tagis Mobile on their mobile device.
    6. Field users need to be close enough to the location of the tags to see them in Augmented
    Reality in their device.
    7. Field users can read the tag labels (names) and click on them if they have a hyperlink.`,
      },

      {
        question: 'How do I create the AR tags? ',
        expanded: false,
        answer: ` You need to setup an account and start a project to be able to create tags. Depending on the type of
    project you choose dictates the actual method you use to create/publish AR tags.`,
      },

      {
        question: 'Why are their different types of projects?',
        expanded: false,
        answer: `We have different types of projects to make it easy to publish tags in different methods depending on
    what will be best/easiest for you and your organization`,
      },

      {
        question: 'What are the different types of projects?',
        expanded: false,
        answer: `We currently offer 4 different types of projects.
    1. Tagis Mapper projects are the easiest. They provide a map for the administrator to simply pick
    locations on the map, anywhere on the globe and create AR tags.
    2. Tagis CAD projects let’s CAD users publish tags from directly inside their CAD application. WE
    currently only support Civil 3D for this process.
    3. Tagis Web Map projects allow users of ESRI ArcGIS to connect an existing ArcGIS Web Map to
    the system and configure POI data from the web map into the Tagisphere.
    4. Tagis Surveyor projects provide access to the NGS Benchmark data as AR tags and also allows
    the administrator to upload tags using a CSV file format.`,
      },

      {
        question: 'Who can see/access my AR tags?',
        expanded: false,
        answer: `A. With a free account all tags are always public, anyone with Tagis Mobile and close enough to find
    them, will see them. With any paid account you can decide on a tag-by-tag basis if they are public or
    private`,
      },

      {
        question: 'How long can I use my free account?',
        expanded: false,
        answer: `You can use your free account for as long at AR Mavericks, Inc. is around to keep the servers running.
    Of course, free accounts have some limitations. The biggest limitation related to using your free account
    for ever is that with a free account, any tags you create will only live for 30 days. Then they disappear
    forever.`,
      },

      {
        question: 'How do private tags work?',
        expanded: false,
        answer: `When you have a paid account, you can invite users to any project you create. It works just like any
    app and once they receive an invitation (via automated email), they can create an account and have
    access to the tags from the project you invited them to.`,
      },

      {
        question: 'Who can I share private tags with?',
        expanded: false,
        answer: `Private tags are only available on paid projects and once you own a project, you can invite anyone you
    want. This can be from your company, from a partner or customer company or anyone you choose`,
      },

      {
        question: 'How safe is the data in my project?',
        expanded: false,
        answer: `All paid accounts store all the data behind an encrypted login system, just like your bank uses.
    However, you can also have you own security layer. The most common use of AR tags in our system is to
    provide a geolocated hyperlink. We store the location, the label name and the hyperlink to show the
    Tagis Mobile user in the field. If you provide a hyperlink to a secure (cloud) location that requires a login,
    then the field user still needs to login to that system as well, a double layer of security.`,
      },
    ];
  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
  toggleAccordion() {
    this.isActive = !this.isActive;
  }
}
