import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  debounceTime,
  switchMap,
  take
} from 'rxjs/operators';
import {
  FhirService
} from '../fhir.service';
import {
  Patient
} from '../Patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {
  // Page load status
  public status: {pending: boolean} = {pending: true};
  // API call response time
  public responseTime: number = 0;
  // List of our patients
  public patients: Array < Patient > = [];
  // Given name input text
  public given: string = '';
  // Family name input text
  public family: string = '';
  // Subscription array
  public subs: any[] = [];
  // Search form
  @ViewChild('searchForm')
  public searchForm: any;
  // Search subject
  public search$: Subject < void > = new Subject();


  constructor(
    //FHIR API service
    private fhir: FhirService
  ) {}

  ngOnInit(): void {
    //Get our initial list of patients
    this.fhir.findPatients()
      .pipe(take(1))
      .subscribe(this.gotPatients, this.err)

    //Subscribe to our search subject
    const searchSub = this.search$
      // Buffer requests by 600ms
      .pipe(debounceTime(600))
      // Return the find patients call
      .pipe(switchMap(() => {
        this.status.pending = true;
        return this.fhir.findPatients(this.given, this.family)
      }))
      .subscribe(this.gotPatients, this.err)

    // Keep track of this subscription
    this.subs.push(searchSub);
  }

  /**
   * Got Patients handler
   * @param res Patient call result
   */
  private gotPatients = (res: any) => {
    // Find the response time
    this.responseTime = res.responseTime;


    // If we dont have an entry, abort
    if (!('entry' in res) || !res['entry'].length) return;


    // Store our list of patients 
    this.patients = [...res['entry']].map(entry => {
      return new Patient(entry['resource'])
    });


    // Tell the page we are finished
    this.status.pending = false;
  }
  /**
   * Error handler
   * @param err 
   */
  private err = (err: any) => {
    console.error('Could not get data')
  }


  /**
   * Change detect handler
   */
  public changeDetect() {
    // If our form is valid, search
    if (this.searchForm.valid) {
      this.search$.next();
    }
  }



  /**
   * Resets the search results
   */
  public reset() {
    this.given = '';
    this.family = '';
    this.search$.next();
  }

  /**
   * Called when we leave the page
   */
  async ngOnDestroy() {
    // Unsubscribe from all of our subscriptions
    this.subs.forEach(async sub => {
      await sub.unsubscribe();
    })
  }


}