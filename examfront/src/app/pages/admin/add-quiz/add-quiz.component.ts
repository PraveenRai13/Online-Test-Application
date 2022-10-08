import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _cat:CategoryService,private _snak:MatSnackBar,private _quiz:QuizService) { }

  // categories=[
  //   {
  //     cid:23,
  //     title:'Programming',
  //   },
  //   {cid:23,
  //     title:'Programming',}
    
  // ]
  categories:any=[]

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    },

  };
   

  

  ngOnInit(): void {

    this._cat.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        // console.log(this.categories)

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','error in loadig data from server','error')
      }
    )

  }

  // 
  addQuiz(){
    console.log(this.quizData)
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snak.open('Title Required !!','',{
        duration:3000,
      })

      return;
    }
    // call server

    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
      Swal.fire('Success','quiz is added','success')

      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid:''
        },
    
      };

      },
      (error)=>{
    Swal.fire('Error !!','Error while adding quiz','error')
      });
  
  }

 

}
