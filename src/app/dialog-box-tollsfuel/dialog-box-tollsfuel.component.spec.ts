import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxTollsfuelComponent } from './dialog-box-tollsfuel.component';

describe('DialogBoxTollsfuelComponent', () => {
  let component: DialogBoxTollsfuelComponent;
  let fixture: ComponentFixture<DialogBoxTollsfuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxTollsfuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxTollsfuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
