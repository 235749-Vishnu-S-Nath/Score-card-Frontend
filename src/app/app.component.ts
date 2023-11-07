import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

interface Question {
  questionId: number;
  question: string;
}

interface Answer{
  answerId: number;
  mark: number;
  questionId: number;
}

interface LOB{
  lobId: number;
  lob: string;
}

interface ITRC{
  itrcId: number;
  itrcName: string;
  lobId: number;
}

interface Application{
  applicationId: number;
  applicationName: string;
  itrcId: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  
  title = 'score-card-dashboard';

  questions: Question[];
  answers: Answer[];
  lobs: LOB[];
  itrcs: ITRC[];
  applications: Application[];

  constructor(private modalService: NgbModal, private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.httpClient.get<Question[]>(`http://localhost:8080/api/v1/question`).subscribe(a=>{
      this.questions=a
    });

    this.httpClient.get<LOB[]>(`http://localhost:8080/api/v1/lob`).subscribe(a=>{
      this.lobs=a
    });

    this.httpClient.get<Application[]>(`http://localhost:8080/api/v1/application`).subscribe(a=>{
      this.applications=a
    });
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  public fetchAnswers(questionId:number): void{
    this.httpClient.get<Answer[]>(`http://localhost:8080/api/v1/answer/question/${questionId}`).subscribe(a=>{
      this.answers=a
    })
  }

  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.httpClient.get<ITRC[]>(`http://localhost:8080/api/v1/itrc/lob/${value}`).subscribe(a=>{
      this.itrcs=a
    });
  }
}
