import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BadgeModule } from 'primeng/badge';
import { TimelineModule } from 'primeng/timeline';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    MenuModule,
    TableModule,
    CarouselModule,
    AvatarModule,
    AccordionModule,
    MenubarModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    SidebarModule,
    TabMenuModule,
    TabViewModule,
    CheckboxModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    DynamicDialogModule,
    BadgeModule,
    TimelineModule,
    AutoCompleteModule,
    ConfirmDialogModule
  ],
  exports: [
    InputTextModule,
    CarouselModule,
    MenuModule,
    TableModule,
    AvatarModule,
    AccordionModule,
    MenubarModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    SidebarModule,
    TabMenuModule,
    TabViewModule,
    CheckboxModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    DynamicDialogModule,
    BadgeModule,
    TimelineModule,
    AutoCompleteModule,
    ConfirmDialogModule
  ],
})
export class PrimeNgModule {}
