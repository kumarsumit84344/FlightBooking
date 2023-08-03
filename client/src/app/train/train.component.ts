import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css'],
})
export class TrainComponent {
  constructor(private service: ApiService) {}
  list: any[] = [];
  pageSlice: any[] = [];
  ngOnInit() {
    this.service.getapidetails().subscribe((data: any) => {
      this.list = data;
      this.pageSlice = data.slice(0, 5);
    });
    console.log(this.list);
  }
  onPageChange(event: PageEvent) {
    const startindex = event.pageIndex * event.pageSize;
    let endIndex = startindex + event.pageSize;
    if (endIndex > this.list.length) {
      endIndex = this.list.length;
    }
    this.pageSlice = this.list.slice(startindex, endIndex);
  }
  panelOpenState = false;
}
