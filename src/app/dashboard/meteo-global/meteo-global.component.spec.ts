import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoGlobalComponent } from './meteo-global.component';

describe('MeteoGlobalComponent', () => {
  let component: MeteoGlobalComponent;
  let fixture: ComponentFixture<MeteoGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
