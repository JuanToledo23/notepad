import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  error = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.loginForm.value)
    .then(response => {
      localStorage.setItem('user', this.loginForm.value.email)
      this.router.navigate(['/home'])
    })
    .catch(error => {
      console.log(error)
      this.error = true;
    })
  }

}
