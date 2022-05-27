import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FhirService {

  constructor(
    // HTTP Client
    private http: HttpClient
  ) { }

  /**
   * Find a list of patients
   * @param given - Given / first name
   * @param family - Family / last name
   * @returns 
   * Observable
   */
  public findPatients(given? : any,family? : any) : Observable<any>{
    // Root url of the fhir API
    const url = `http://hapi.fhir.org/baseR4/Patient`;
    
    // Create a params object
    let params : any = {
      // Sort by name & birthdate
      _sort:'name,birthdate',
    };
    
    // If we have a given name, add it to the params
    !given || (params['given'] = given);
    
    // If we have a family name, add it to the params
    !family || (params['family'] = family);
    
    
    // Save the current time
    let responseTime = Date.now();
    
    return this.http.get(url,{params})
      // Add the the response time to the result
      .pipe(map(res=>{
      responseTime = ((Date.now() - responseTime) / 1000);
      return Object.assign(res,{responseTime})
    }));
  }
}
