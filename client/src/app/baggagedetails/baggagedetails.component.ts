import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-baggagedetails',
  templateUrl: './baggagedetails.component.html',
  styleUrls: ['./baggagedetails.component.css'],
})
export class BaggagedetailsComponent {
  sourceAirportCode: any;
  destinationAirportCode: any;

  constructor(public service: ApiService) {}
  ngOnInit() {
    this.sourceAirportCode = this.service.bookingData.sourceAirportCode;
    this.destinationAirportCode =
      this.service.bookingData.destinationAirportCode;
  }
}
