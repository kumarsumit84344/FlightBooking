import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaredetailsComponent } from './faredetails.component';

describe('FaredetailsComponent', () => {
  let component: FaredetailsComponent;
  let fixture: ComponentFixture<FaredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaredetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
