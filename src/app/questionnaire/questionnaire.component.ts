import { Component, OnInit, ViewChild } from '@angular/core';
import questionnaire from '../../assets/questionnaire.json';
@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {
  // Questionnaire JSON
  public questionnaire = questionnaire;
  // Questionnaire answers
  public answers : any = {};
  // Questionnaire results 
  public results : any[] = [];
  
  @ViewChild('questionnaireForm')
  public questionnaireForm : any

  public dateErrors : any = {}


  // Form submission flag 
  public submitted : boolean = false;

  constructor() { }

  ngOnInit(): void {}

  /**
   * Checks a date is valid
   * @param dateId - ID of the date field question
   */
  public checkDate(dateId : string){
    // Find the date field
    const date = new Date(this.answers[dateId]);
    // Get the current date
    const currDate = new Date();
    // Check if the date is in the future
    this.dateErrors[dateId] = (date.getTime() > currDate.getTime());
  }

  /**
   * Checks to see if all stored dates are valid
   * @returns - Boolean
   */
  public validDates(){
    return Object.values(this.dateErrors).every(v=> !v)
  }


  /**
   * Form submit handler
   */
  public formSubmit(){
    // Map questions and answers to a results array
    this.results = Object.keys(this.answers).map(key=>{
      // Find the question
      const question : any = this.questionnaire.item.find(i=> i.linkId === key);
      // Return the question text along with the answer
      return {question: question.text, answer: this.answers[key]}
    });
    this.submitted = true;
  }



}
