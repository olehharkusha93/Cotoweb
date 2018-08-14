import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { Reservation } from '../models/reservation';

@Injectable()
export class ReservationService {

  private headers = new Headers({'Content-Type': 'application/json'});;

  constructor(private authHttp: AuthHttp) { }

  createReservation(reservation: any): Promise<Reservation> {
      let res = JSON.parse(JSON.stringify(reservation));
      return this.authHttp.post(`${environment.apiUrl}/reservation`, JSON.stringify(reservation), {headers: this.headers})
      .toPromise()
      .then(user => {res = user.json();
      return res;
      })
      .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}