import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { BaggagedetailsComponent } from '../baggagedetails/baggagedetails.component';
import { MatDialog } from '@angular/material/dialog';
import { FaredetailsComponent } from '../faredetails/faredetails.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent {
  showLoader: boolean = false;
  source: any;
  dest: any;
  layover: any;
  name: any;
  departureTime: any;
  sourceAirportCode: any;
  sourceAirport: any;
  data: any[] = [];
  givenDate: any;
  destinationAirportCode: any;
  destinationAirport: any;
  arrivalTime: any;
  duration: any;
  traveller_details: FormGroup;
  seatDetails: any;
  fare: any;
  success: boolean = false;
  statusMsg: string = '';
  constructor(
    public service: ApiService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.traveller_details = this.fb.group({
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Contact: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.source = this.service.bookingData.source;
    this.dest = this.service.bookingData.destination;
    this.layover = this.service.bookingData.layover;
    this.name = this.service.bookingData.name;
    this.departureTime = this.service.bookingData.departureTime;
    this.sourceAirportCode = this.service.bookingData.sourceAirportCode;
    this.sourceAirport = this.service.bookingData.sourceAirport;
    this.givenDate = this.service.GivenDate;
    this.destinationAirportCode =
      this.service.bookingData.destinationAirportCode;
    this.destinationAirport = this.service.bookingData.destinationAirport;
    this.arrivalTime = this.service.bookingData.arrivalTime;
    this.duration = this.service.bookingData.duration;
    this.fare = this.service.bookingData.fare;
    this.getSeat();
  }

  getSeat() {
    this.service.seatdetails().subscribe((data: any) => {
      this.seatDetails = data.all_seat;
    });
  }
  baggagedetail() {
    this.dialog.open(BaggagedetailsComponent);
  }
  faredetail() {
    this.dialog.open(FaredetailsComponent);
  }
  panelOpenState = false;
  validDetails: boolean = false;

  proceed() {
    this.service
      .postTravelData(this.traveller_details.value)
      .subscribe((data: any) => {
        console.log(data);
      });
    this.validDetails = this.traveller_details.valid;
  }

  isPreviousSeat: any = null;
  seatPrice!: string;
  seat: any;
  grandTotal: any;
  isSeatSelected: boolean = false;
  Pnr: any;

  highlighted(seat: any) {
    if (this.isPreviousSeat) {
      this.isPreviousSeat.isSelected = false;
    }

    seat.isSelected = true;
    this.isSeatSelected = seat.isSelected;
    this.isPreviousSeat = seat;
    this.seatPrice = seat.price;
    console.log(this.seatPrice);
    console.log(this.seat);
    this.seat = seat.SeatNo;
    this.grandTotal = parseInt(this.fare) + parseInt(this.seatPrice) + 1200;
  }

  payment() {
    if (!this.isSeatSelected) {
      alert('please choose your seat');
    } else {
      this.showLoader = true;
      this.statusMsg = 'Hold-On..Confirming your Seat...';
      setTimeout(() => {
        this.showLoader = false;
        this.router.navigate(['/ConfirmationPage']);
      }, 5000);

      this.Pnr = (Math.random() + 1).toString(36).substring(7);
      const obj = {
        source: this.service.bookingData.source,
        dest: this.service.bookingData.destination,
        layover: this.service.bookingData.layover,
        name: this.service.bookingData.name,
        departureTime: this.service.bookingData.departureTime,
        sourceAirportCode: this.service.bookingData.sourceAirportCode,
        sourceAirport: this.service.bookingData.sourceAirport,
        givenDate: this.service.GivenDate,
        destinationAirportCode: this.service.bookingData.destinationAirportCode,
        destinationAirport: this.service.bookingData.destinationAirport,
        arrivalTime: this.service.bookingData.arrivalTime,
        duration: this.service.bookingData.duration,
        fare: this.service.bookingData.fare,
        GrandTotal: this.grandTotal,
        seatNo: this.seat,
        PNR: this.Pnr,
      };
      this.service.travellDetails = obj;
      this.service.passengerDetails = this.traveller_details.value;
    }
  }
}

//

// departureTime: '23:12';
// destination: 'Mumbai';
// destinationAirport: 'Chhatrapati Shivaji International Airport – BOM';
// destinationAirportCode: 'BOM';
// duration: '02h10m';
// fare: '5000';
// layover: 'Direct ';
// name: 'SpiceJet';
// source: 'New Delhi';
// sourceAirport: 'Indira Gandhi International Airport – DEL';
// sourceAirportCode: 'DEL';
