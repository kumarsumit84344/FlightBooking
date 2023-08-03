import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snack: MatSnackBar) {}
  showPositive(msg: string) {
    this.snack.open(msg, undefined, {
      panelClass: 'green',
      duration: 1000,
    });
  }
  showNegative(msg: string) {
    this.snack.open(msg, undefined, {
      panelClass: 'red_bg',
      duration: 1000,
    });
  }
}
