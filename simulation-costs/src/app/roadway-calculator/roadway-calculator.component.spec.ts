import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadwayCalculatorComponent } from './roadway-calculator.component';

describe('RoadwayCalculatorComponent', () => {
  let component: RoadwayCalculatorComponent;
  let fixture: ComponentFixture<RoadwayCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadwayCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadwayCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
