import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadwayParameterComponent } from './roadway-parameter.component';

describe('RoadwayParameterComponent', () => {
  let component: RoadwayParameterComponent;
  let fixture: ComponentFixture<RoadwayParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadwayParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadwayParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
