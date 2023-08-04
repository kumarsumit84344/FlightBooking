import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { BookdetailsComponent } from '../bookdetails/bookdetails.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent {
  selected!: string;
  flights: any;
  search!: string;
  result!: any[];
  destResult: any[] = [];
  oneWayTravelDetails!: FormGroup;
  roundTravelDetails!: FormGroup;
  flightResult: boolean = false;
  flightSearchedResult: any;
  ShowNotice: boolean = true;

  constructor(
    private service: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.oneWayTravelDetails = this.fb.group({
      onewaySource: ['', Validators.required],
      onewayDest: ['', [Validators.required]],
      onewayDate: ['', Validators.required],
    });
    this.roundTravelDetails = this.fb.group({
      roundSource: ['', Validators.required],
      roundDest: ['', [Validators.required]],
      roundTravelDate: ['', Validators.required],
      roundReturnDate: ['', Validators.required],
    });
  }
  data: any;
  ngOnInit() {
    this.service.getFlightDetails().subscribe((flight: any) => {
      this.flights = flight.all_flight;
    });
    this.service.OnFlightPage = true;
  }

  onSubmit() {
    this.flightResult = true;
    var GivenDate = this.oneWayTravelDetails.value.onewayDate;
    this.service.GivenDate = GivenDate;
    var CurrentDate = new Date();
    GivenDate = new Date(GivenDate);
    if (GivenDate < CurrentDate) {
      this.flightResult = false;
      alert('Given date must be greater than the current date.');
    }
    this.service
      .searchFlight(this.oneWayTravelDetails.value)
      .subscribe((res: any) => {
        this.flightSearchedResult = res.all_airlines;
        this.data = res.all_airlines;
      });
  }

  searchResult: any[] = [];
  fetchSeries(event: any) {
    if (event.target.value === '') {
      return (this.searchResult = []);
    }
    return (this.searchResult = this.flights.filter((series: any) => {
      return series.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    }));
  }
  fetchdest(data: any) {
    if (data.target.value === '') {
      return (this.destResult = []);
    }
    return (this.destResult = this.flights.filter((dest: any) => {
      return dest.name.toLowerCase().includes(data.target.value.toLowerCase());
    }));
  }
  onChange(e: any) {
    this.selected = e.target.value;
    this.flightResult = false;
    this.oneWayTravelDetails.reset();
    this.roundTravelDetails.reset();
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  filterOpted: boolean = false;
  filterOn: any;

  priceFilter5() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.fare >= '5000' && f.fare <= '7000'
    );
  }
  priceFilter6() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.fare >= '7000' && f.fare <= '9000'
    );
  }
  priceFilter7() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.fare >= '9000' && f.fare <= '11000'
    );
  }
  filter() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.departureTime < '06:00'
    );
  }
  filter12() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.departureTime > '06:00' && f.departureTime < '12:00'
    );
  }
  filter18() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.departureTime > '12:00' && f.departureTime < '18:00'
    );
  }
  filterAfter18() {
    this.filterOpted = true;
    this.flightSearchedResult = this.data.filter(
      (f: any) => f.departureTime > '18:00'
    );
  }
  clearFilter() {
    this.filterOpted = false;
    this.flightSearchedResult = this.data;
  }
  bookdetails(data: any[]) {
    this.router.navigate(['/bookingDetails']);
    this.service.bookingData = data;
  }
  close() {
    this.ShowNotice = false;
  }
}
