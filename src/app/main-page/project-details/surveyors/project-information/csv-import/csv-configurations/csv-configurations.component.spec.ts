import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvConfigurationsComponent } from './csv-configurations.component';

describe('CsvConfigurationsComponent', () => {
  let component: CsvConfigurationsComponent;
  let fixture: ComponentFixture<CsvConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
