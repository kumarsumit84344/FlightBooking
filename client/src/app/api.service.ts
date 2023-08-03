import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  loginStatus: any;
  errMsg: any;
  OnFlightPage: boolean = false;
  bookingData: any;
  GivenDate: any;
  passengerDetails: any;
  travellDetails: any;

  signupData(data: any) {
    const obj = {
      name: data.name,
      email: data.email,
      date_of_birth: data.date_of_birth,
      password: data.password,
    };
    return this.http.post('http://localhost:3000/signup', obj);
  }

  loginData(data: any) {
    const obj = {
      email: data.email,
      password: data.password,
    };
    return this.http.post('http://localhost:3000/login', obj);
  }

  Data(data: any) {
    const obj = {
      name: data.name,
      airport: data.airport,
    };
    return this.http.post('http://localhost:3000/flight', obj);
  }

  public isUserLoggedIn(): boolean {
    const user_id = localStorage.getItem('user_id');
    return user_id ? true : false;
  }

  getFlightDetails() {
    return this.http.get('http://localhost:3000/flight');
  }

  searchFlight(data: any) {
    const obj = {
      sourceAirport: data.onewaySource,
      destinationAirport: data.onewayDest,
    };
    return this.http.post('http://localhost:3000/airlinesdata', obj);
  }
  getapidetails() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos');
  }

  seatdetails() {
    return this.http.get('http://localhost:3000/seatdata');
  }

  postTravelData(data: any) {
    const obj = {
      Title: data.Title,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Contact: data.Contact,
    };
    console.log(obj);
    return this.http.post('http://localhost:3000/addtraveller', obj);
  }
}
