import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-finalticket',
  templateUrl: './finalticket.component.html',
  styleUrls: ['./finalticket.component.css'],
})
export class FinalticketComponent {
  constructor(public service: ApiService) {}
  passengerDetails: any;
  travellerDetails: any;
  showLoader: Boolean = false;
  statusMsg: string = '';
  ngOnInit() {
    this.passengerDetails = this.service.passengerDetails;
    this.travellerDetails = this.service.travellDetails;
    this.showLoader = true;
    this.statusMsg = 'Confirming your payment...';
    setTimeout(() => {
      this.showLoader = false;
    }, 5000);
  }
  print() {
    window.print();
  }
}
