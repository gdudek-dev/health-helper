import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';

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

  }

  changeBMIdata() {

  }

  unableToConnectError() {
    this.toastService.showNotification(
      this.translationService.getTranslation("unable_to_connect")!,
      this.translationService.getTranslation("cancel")!,
      "error");
  }
}
