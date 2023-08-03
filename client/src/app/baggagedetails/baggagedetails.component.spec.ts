import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggagedetailsComponent } from './baggagedetails.component';

describe('BaggagedetailsComponent', () => {
  let component: BaggagedetailsComponent;
  let fixture: ComponentFixture<BaggagedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaggagedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
