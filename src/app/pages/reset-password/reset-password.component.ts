import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordFormStateAction } from '../../states/form';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonState } from 'src/app/states/common/common.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'az-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  private ngUnsubscribe = new Subject();
  @Select(CommonState.getState) language: Observable<any>;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public translate: TranslateService,
    private _store: Store,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    public loader: NgxSpinnerService
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      if (!code) {
        this.toastr.error("Reset password code is invalid");
        this.router.navigate(['login'])
      }
    });

    this.form = fb.group({
      email: ['demo@gmail.com'],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
    console.log(this.translate);
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  ngOnInit(): void {
    this.language.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.language) {
          this.translate.setDefaultLang(response.language);
        } else {
          this.translate.setDefaultLang("no");
        }
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onSubmit(value) {
    if (this.form.valid) {
      this.loader.show();
      this._store.dispatch(new ResetPasswordFormStateAction());
    }
  }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    let password = group.controls[passwordKey];
    let passwordConfirmation = group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({ mismatchedPasswords: true })
    }
  }
}
