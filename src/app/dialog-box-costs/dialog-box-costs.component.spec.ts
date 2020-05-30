import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxCostsComponent } from './dialog-box-costs.component';

describe('DialogBoxCostsComponent', () => {
  let component: DialogBoxCostsComponent;
  let fixture: ComponentFixture<DialogBoxCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
