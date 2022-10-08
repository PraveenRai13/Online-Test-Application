import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  Questions: any=[]

  

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snak:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuizAll(this.qId).subscribe(

      (data)=>{
        this.Questions=data

      },
      error=>{
        Swal.fire('Error !!','','error')
        console.log(error)
      }
    )
  }

  // delete question
  deleteQuestion(qId: any){
    

      Swal.fire({

        icon:'info',
        showCancelButton:true,
        confirmButtonText:'Delete',
        title :'Are you sure, want to delete question?'
      }).then((result)=>{

        if(result.isConfirmed){
          // confirm
          this._question.deleteQuestion(qId).subscribe(
            (data)=>{
                this._snak.open('Question Deleted','',{
                  duration:3000,
                });
                this.Questions=this.Questions.filter((q:any)=>q.quesId!=qId)
            },
            error=>{
                this._snak.open('Error in deleting questions','',{
                  duration:3000
                });

                console.log(error)

            }
          )

        }
      });

      
    

  }

}
