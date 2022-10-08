import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;

  marksGot = 0
  correctAnswer = 0
  attempted = 0

  isSubmit = false;
  timer: any


  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) { }

  ngOnInit(): void {

    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid']
    console.log(this.qid)

    this.loadQuestions();

  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        // console.log(data)
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;


        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = ''
        // });

        console.log(this.questions)
        this.startTimer();


      },
      error => {
        console.log(error)
        Swal.fire("Error", "Error in loading questions", 'error')
      }
    )
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })


  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',

      showCancelButton: true,
      confirmButtonText: 'submit',

      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        // calculation
        this.evalQuiz();

      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        
        clearInterval(t)
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min: ${ss} sec`
  }


  // function for submitting quiz for timer or Submit quiz button
  evalQuiz() {
    // calculation
//------------------

    // call the server to evaluate the quiz

    this._question.evalQuiz(this.questions).subscribe(
      (data: any)=>{
        console.log(data)
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2))
        this.correctAnswer=data.correctAnswer
        this.attempted=data.attempted
        this.isSubmit = true

      },
      (error)=>{
        console.log(error)
      }
    )








//------------------------------
    // this.isSubmit = true,

    //   console.log(this.questions)
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer) {
    //     this.correctAnswer++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length
    //     this.marksGot += marksSingle
    //   }

    //   if (q.givenAnswer.trim() != '') {
    //     this.attempted++
    //   }


    // });
    // console.log("Correct Answers :" + this.correctAnswer)
    // console.log("Marks Got :" + this.marksGot)
    // console.log("attempted :" + this.attempted)

  }

  printPage(){
    window.print();
  }

}

