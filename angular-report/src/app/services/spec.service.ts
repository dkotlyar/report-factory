import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Papa} from 'ngx-papaparse';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecService {

  constructor(private http: HttpClient, private papa: Papa) { }

  getLocalReportData(id: string): Promise<any> {
    // @ts-ignore
    return this.http.get('assets/data/' + id + '.csv', {responseType: 'text/csv'})
        .pipe(
            map(val => String(val)),
            map(val => this.papa.parse(val, {
              header: true,
              skipEmptyLines: true
            })),
            map(val => val.data)
        ).toPromise();
  }
}
