import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  name: string | null = ''

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
  }

  logOut() {
    this.userService.logout()
    .then(() => {
      localStorage.clear();
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error))
  }

}
