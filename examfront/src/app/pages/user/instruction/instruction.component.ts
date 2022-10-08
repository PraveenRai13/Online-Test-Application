import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  qid: any
  quiz: any

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid']
    // console.log(this.qid)

    this._quiz.getQuiz(this.qid).subscribe(
      (data)=>{
        this.quiz=data
        console.log(data)
      },
      error=>{
        console.log(error)
      }
    )
  }

  //
  startQuiz(){


    // copy form sweetalert2
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
     
        this._router.navigate(['/start/'+this.quiz.qId])

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
