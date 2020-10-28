import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ForgotPasswordFormStateAction } from 'src/app/states/form';
import { UpdateFormValue } from '@ngxs/form-plugin';



@Component({
  selector: 'az-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public email: AbstractControl;

  constructor(public fb: FormBuilder,
    public _store: Store,
    public router: Router,
    public translate: TranslateService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
    });
    const lang = localStorage.getItem("language");
    translate.setDefaultLang(lang);
    this.email = this.form.controls['email']
  }

  ngOnInit(): void {

  }

  public onEmailSubmit(value: Object) {
    console.log(this.form);

    if (this.form.valid) {
      this._store.dispatch(new ForgotPasswordFormStateAction(this.form.value)).subscribe((res: any) => {
        console.log(res);
        this.form.reset();
        this.backtoLogin();
        // this.isForgot = false;
      })
    }
  }

  public backtoLogin() {
    this.fnResetLoginFormState();
    this.router.navigate(['login'])
  }

  private fnResetLoginFormState() {
    this._store.dispatch(
      new UpdateFormValue({ value: {}, path: 'form.login' })
    );
  }

}
export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}