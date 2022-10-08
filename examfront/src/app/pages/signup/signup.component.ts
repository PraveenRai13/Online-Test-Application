import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }

//1. you can make oject by using inrerface or class or 2. direct create object                         
  public user={               
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };                    

  ngOnInit(): void {}

formSubmit(){
  // alert("submit")
  console.log(this.user);
  if(this.user.username=='' || this.user.username == null){
    // alert('user is required !!')
    this.snack.open("Username is required !!",'',{
      duration:3000,
      // verticalPosition:'top',
      // horizontalPosition:'right'
    });
    return;
  }
    // validate

    

  //add :userservice
  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      console.log(data)
      // alert('success')
      Swal.fire('Successfully done !!','user id is'+ data.id, 'success');
    },
    (error:any)=>{
      // error
      console.log(error)
      // alert('something went wrong')
      this.snack.open(error.error.text,'',{
        duration:3000
      })
    }
  )
}





}



