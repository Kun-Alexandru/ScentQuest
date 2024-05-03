import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserResponse} from "../../../../services/models/user-response";
import {UserService} from "../../../../services/services/user.service";
import {PageResponseUserResponse} from "../../../../services/models/page-response-user-response";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  userResponse: PageResponseUserResponse = {};
  users: UserResponse[] = [];
  page: number = 0;
  size = 12;
  pages: any = [];
  message = '';
  level: 'success' |'error' = 'success';
  filterValue = '';
  searchword = '';


  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fetchUsers() {
    this.userService.findAllUsers({
      page: this.page,
      size: this.size,
      filter: this.filterValue,
      searchWord: this.searchword
    })
      .subscribe({
        next: (users) => {
          this.userResponse = users;
          this.pages = Array(this.userResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  lockAccount(userId: number | undefined) {
    this.userService.lockUser({
      'user-id': userId as number
    })
      .subscribe({
        next: (users) => {
          this.fetchUsers();
          this.showSnackbar('User access changed')
        }
      });
  }

  editAccount(userId: number | undefined) {
    this.router.navigate(['/admin/edit-user', userId]);
  }

  gotToPage(page: number) {
    this.page = page;
    this.fetchUsers();
  }

  goToFirstPage() {
    this.page = 0;
    this.fetchUsers();
  }

  goToPreviousPage() {
    this.page --;
    this.fetchUsers();
  }

  goToLastPage() {
    this.page = this.userResponse.totalPages as number - 1;
    this.fetchUsers();
  }

  goToNextPage() {
    this.page++;
    this.fetchUsers();
  }

  get isLastPage() {
    return this.page === this.userResponse.totalPages as number - 1;
  }

  onAccountStatusChange(event: any) {
    this.filterValue = event.target.value;
    this.fetchUsers();
  }

  textSearch(word: string) {
    this.searchword = word;
    this.fetchUsers();
  }

  onInputChange(event: any) {
    this.searchword = event.target.value;
    this.fetchUsers();
  }
}
