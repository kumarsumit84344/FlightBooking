import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-faredetails',
  templateUrl: './faredetails.component.html',
  styleUrls: ['./faredetails.component.css'],
})
export class FaredetailsComponent {
  sourceAirportCode: any;
  destinationAirportCode: any;

  constructor(public service: ApiService) {}
  ngOnInit() {
    this.sourceAirportCode = this.service.bookingData.sourceAirportCode;
    this.destinationAirportCode =
      this.service.bookingData.destinationAirportCode;
  }
}
