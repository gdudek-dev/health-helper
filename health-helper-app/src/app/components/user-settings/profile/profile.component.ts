import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authorization/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public step: number = 0;
  public nameForm!: FormGroup;
  public dataForBMIForm!: FormGroup;
  public user!: User;
  public isDataLoaded: boolean = false;

  setStep(stepNumb: number) {
    this.step = stepNumb;
  }

  constructor(
    private toastService: ToastService,
    private translationService: TranslationService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo().then(
      () => {
        this.initNameForm();
        this.initDataForBMIForm();
        this.isDataLoaded = true;
      }, () => {
        this.unableToConnectError();
      })
  }


  getUserInfo() {
    var promise = new Promise<void>((resolve, reject) => {
      this.userService.getUserBySessionKey().subscribe({
        next: (res) => {
          this.user = res;
          resolve();
        },
        error: () => {
          reject();
        }
      });
    })

    return promise;
  }

  initNameForm() {
    this.nameForm = new FormGroup({
      first_name: new FormControl(this.user.firstName, [Validators.required]),
      last_name: new FormControl(this.user.lastName, [Validators.required]),
    });
  }

  initDataForBMIForm() {
    this.dataForBMIForm = new FormGroup({
      gender: new FormControl(this.user.userInfoDTO.gender, [Validators.required]),
      weight: new FormControl(this.user.userInfoDTO.weight, [Validators.required]),
      height: new FormControl(this.user.userInfoDTO.height, [Validators.required]),
      age: new FormControl(this.user.userInfoDTO.age, [Validators.required])
    });
  }

  changeName() {
    if (this.nameForm.valid) {
      this.user.firstName = this.nameForm.get('first_name')?.value;
      this.user.lastName = this.nameForm.get('last_name')?.value;

      this.updateUser();
    }
  }

  changeBMIdata() {
    if (this.dataForBMIForm.valid) {
      this.user.userInfoDTO.gender = this.dataForBMIForm.get('gender')?.value;
      this.user.userInfoDTO.weight = this.dataForBMIForm.get('weight')?.value;
      this.user.userInfoDTO.height = this.dataForBMIForm.get('height')?.value;
      this.user.userInfoDTO.age = this.dataForBMIForm.get('age')?.value;

      this.updateUser();
    }
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.userService.deleteById(this.user.id).subscribe({
          next: () => {
            this.router.navigate(['login'])
          },
          error: () => {
            this.unableToConnectError();
          }
        })
      }
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe({
      next: () => {
        this.updateSuccessfully();
      },
      error: () => {
        this.unableToConnectError();
      }
    })
  }

  updateSuccessfully() {
    this.toastService.showNotification(
      this.translationService.getTranslation("updated_successfully")!,
      this.translationService.getTranslation("cancel")!,
      "success");
  }

  unableToConnectError() {
    this.toastService.showNotification(
      this.translationService.getTranslation("unable_to_connect")!,
      this.translationService.getTranslation("cancel")!,
      "error");
  }
}
