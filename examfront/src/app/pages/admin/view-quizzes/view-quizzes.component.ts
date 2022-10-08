import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

 // quizzes=[

    // {
    //   qId:23,
    //   title:'Basic Java Quiz',
    //   description:'java is best programming language for learneres',
    //   maxMarks:'50',
    //   numberOfQuestions:'20',
    //   active:'',
    //   category:{
    //     title:'Programming'
    //   }

    // },
   
 // ]
 quizzes:any


  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error)=>{
        console.log(error)
        Swal.fire('Error !','Error in loading data !','error')
      }

    );

  }

   // delete quiz
   deleteQuiz(qId:any){


    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){

        // delete

        this._quiz.deleteQuiz(qId).subscribe(
          (data:any)=>{
     
           //  list of quizzes se filter out kijiye,qId!=qId : ye hua to this.quizzes to ismai add kro
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=qId);  
            Swal.fire('Sucess','Quiz deleted','success')
          },
          
            (error)=>{
              console.log(error)
              Swal.fire('Error','Error in deleting quiz','error')
            });
      }
    }

    )
  
     }

     // update quiz
     // quiz ki old id send, send new data

   
      

}
