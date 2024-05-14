import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    const userId = this.activatedRoute.snapshot.params['id'];
    if(userId) {
      this.userService.findUserById({
        'user-id': userId as number
      })
        .subscribe({
          next: (user) => {
            console.log(user);
          },
          error: (error) => {
            console.log(error);
          }
        })
    }
  }

}
