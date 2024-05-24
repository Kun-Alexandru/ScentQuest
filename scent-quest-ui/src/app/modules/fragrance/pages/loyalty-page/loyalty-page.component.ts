import { Component, OnInit } from '@angular/core';
import { PageResponseSites } from '../../../../services/models/page-response-sites';
import { PageResponseClaimResponse } from '../../../../services/models/page-response-claim-response';
import { FragranceService } from '../../../../services/services/fragrance.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../../../services/token/token.service';
import { MatDialog } from '@angular/material/dialog';
import { ReactionService } from '../../../../services/services/reaction.service';
import { UserService } from '../../../../services/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import {Sites} from "../../../../services/models/sites";
import {ClaimResponse} from "../../../../services/models/claim-response";
import {PageResponseCoupons} from "../../../../services/models/page-response-coupons";

@Component({
  selector: 'app-loyalty-page',
  templateUrl: './loyalty-page.component.html',
  styleUrls: ['./loyalty-page.component.scss']
})
export class LoyaltyPageComponent implements OnInit {

  sitesResponse: PageResponseSites = { content: [] };
  pageSites = 0;
  sizeSites = 5;
  pagesSites: any = [];

  claimsResponse: PageResponseClaimResponse = { content: [] };
  pageClaims = 0;
  sizeClaims = 10;
  pagesClaims: any = [];

  couponsResponse: PageResponseCoupons = { content: [] };
  pageCoupons = 0;
  sizeCoupons = 10;
  pagesCoupons: any = [];

  points: number | undefined = 0;

  constructor(
    private fragranceService: FragranceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private reactionService: ReactionService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAllSites();
    this.getAllCoupons();
    this.getAllClaims();
  }

  getAllSites() {
    this.userService.getAllSitesPaged({
      page: this.pageSites,
      size: this.sizeSites
    }).subscribe({
      next: (response) => {
        this.sitesResponse = response;
        this.pagesSites = Array(this.sitesResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
      }
    });
  }

  getAllCoupons() {
    this.userService.getAllCouponsByUserId({
      page: this.pageCoupons,
      size: this.sizeCoupons,
      'user-id': this.tokenService.userId
    }).subscribe({
      next: (response) => {
        this.couponsResponse = response;
        this.pagesCoupons = Array(this.couponsResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
      }
    });
  }

  getAllClaims() {
    this.userService.getAllClaimsByUserId({
      page: this.pageClaims,
      size: this.sizeClaims,
      'user-id': this.tokenService.userId
    }).subscribe({
      next: (response) => {
        this.claimsResponse = response;
        this.pagesClaims = Array(this.claimsResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
      }
    });
  }

  getUser() {
    this.userService.findUserById({
      'user-id': this.tokenService.userId
    }).subscribe({
        next: (response) => {
          this.points = response.points;
        }
    });
  }

  generateCoupon(siteId: number | undefined) {
      this.userService.generateCoupon({
        'user-id': this.tokenService.userId,
        'site-id': siteId as number
      }).subscribe({
        next: (res) => {
            this.showSnackbar('Coupon generated successfully');
            this.getUser();
            this.getAllSites();
            this.getAllCoupons();
        },
        error: (error) => {
            this.showSnackbar('Insufficient loyalty points');
        }
      });
    }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


  gotToPageCoupons(page: number) {
    this.pageCoupons = page;
    this.getAllCoupons();
  }

  goToFirstPageCoupons() {
    this.pageCoupons = 0;
    this.getAllCoupons();
  }

  goToPreviousPageCoupons() {
    this.pageCoupons --;
    this.getAllCoupons();
  }

  goToLastPageCoupons() {
    this.pageCoupons = this.couponsResponse.totalPages as number - 1;
    this.getAllCoupons();
  }

  goToNextPageCoupons() {
    this.pageCoupons++;
    this.getAllCoupons();
  }

  get isLastPageCoupons() {
    return this.pageCoupons === this.couponsResponse.totalPages as number - 1;
  }



  gotToPageSites(page: number) {
    this.pageSites = page;
    this.getAllSites();
  }

  goToFirstPageSites() {
    this.pageSites = 0;
    this.getAllSites();
  }

  goToPreviousPageSites() {
    this.pageSites --;
    this.getAllSites();
  }

  goToLastPageSites() {
    this.pageSites = this.sitesResponse.totalPages as number - 1;
    this.getAllSites();
  }

  goToNextPageSites() {
    this.pageSites++;
    this.getAllSites();
  }

  get isLastPageSites() {
    return this.pageSites === this.sitesResponse.totalPages as number - 1;
  }


  gotToPageClaims(page: number) {
    this.pageClaims = page;
    this.getAllClaims();
  }

  goToFirstPageClaims() {
    this.pageClaims = 0;
    this.getAllClaims();
  }

  goToPreviousPageClaims() {
    this.pageClaims --;
    this.getAllClaims();
  }

  goToLastPageClaims() {
    this.pageClaims = this.claimsResponse.totalPages as number - 1;
    this.getAllClaims();
  }

  goToNextPageClaims() {
    this.pageClaims++;
    this.getAllClaims();
  }

  get isLastPageClaims() {
    return this.pageClaims === this.claimsResponse.totalPages as number - 1;
  }


}
