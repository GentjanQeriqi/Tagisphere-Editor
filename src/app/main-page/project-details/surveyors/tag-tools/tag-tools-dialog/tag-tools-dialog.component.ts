import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Entry, TagCategory } from 'src/app/shared/interfaces/tags.interface';
import { DialogDataService } from 'src/app/shared/services/dialog-data.service';
import { TagToolsService } from 'src/app/shared/services/tag-tools.service';

@Component({
  selector: 'app-tag-tools-dialog',
  templateUrl: './tag-tools-dialog.component.html',
  styleUrls: ['./tag-tools-dialog.component.scss']
})
export class TagToolsDialogComponent implements OnInit{
  tagEditForm: FormGroup = new FormGroup({});
  categories: TagCategory[] = [];
  subCategories: TagCategory[] = [];
  offsetType = [ {name: 'Meters'},{name: 'Kilometers' } ];
  icons = [
    {id: 1, name: 'Map Point', src: 'assets/images/Group32696.png'},
    {id: 2, name: 'Map Point', src: 'assets/images/MapPinIcon.png'},
    {id: 3, name: 'Map Point', src: 'assets/images/MapPin2.png'}
  ];
  disableIcons:boolean = true
  selectedCategory!: number
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>()
  selectedIcon: any;
  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private router: Router,
    private tagToolsService: TagToolsService,
    private dialogService: DialogDataService
  ) {}


  ngOnInit() {
    this.buildForm();
    this.getCategories();

  }

  getCategories(){
    const url = this.router.parseUrl(this.router.url)
    const id = url.root.children['primary'].segments[3]
    this.tagToolsService.getCategories(Number(id)).subscribe((next: any) => {
       this.categories = next;
       const foundItem: any = this.categories.filter((item: TagCategory) => item.level === 1);
       this.categories = foundItem;
       this.categoryChanged()
    })
  }

  buildForm(){
    if(this.config.data){
    this.tagEditForm = this.fb.group({
      name: new FormControl(this.config.data.name),
      project: new FormControl(this.config.data.project),
      additional_data: new FormControl(this.config.data.additional_data),
      category: new FormControl(this.config.data.category),
      latitude: new FormControl(this.config.data.location.coordinates[1]),
      longitude: new FormControl(this.config.data.location.coordinates[0]),
      entries: new FormArray([
        new FormGroup({
          name: new FormControl('string'),
          hyperlink: new FormControl(''),
          entry_type: new FormControl('LINK'),
          entry_value: new FormControl('string')
        })
      ]),
      icon: new FormControl(this.config.data.icon),
      offset: new FormControl(this.config.data.offset)
    });
  }
  const iconctrl = this.tagEditForm.get('icon')
  iconctrl?.disable()
  this.patchEntries(this.config.data.entries);
}

patchEntries(entriesData: Entry[]) {
  const entryControls = entriesData.map(entry => new FormGroup({
    name: new FormControl(entry.name),
    hyperlink: new FormControl(entry.hyperlink),
    entry_type: new FormControl(entry.entry_type),
    entry_value: new FormControl(entry.entry_value)
  }));

  this.tagEditForm.setControl('entries', new FormArray(entryControls));
}

get entries(): FormArray {
  return this.tagEditForm.get('entries') as FormArray;
}

categoryChanged(event?: any){
  const catId = event ? event  : this.tagEditForm.get('category')?.value
  const foundItem: any = this.categories.find((item: TagCategory) => item.id === catId );
  this.subCategories = foundItem?.children;
  this.tagEditForm.patchValue({
    additional_data: this.config.data.additional_data
  });
}

updateTag(){
    this.tagToolsService.updateTag(this.tagEditForm.value, this.config.data.id).subscribe(next => {
    this.dialogRef.close(next);
});
}
}