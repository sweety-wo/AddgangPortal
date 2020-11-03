import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordFormStateAction } from '../../states/form';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WizardValidationService } from '../form-elements/wizard/wizard-validation.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'az-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [WizardValidationService]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public translate: TranslateService,
    private _store: Store,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    public loader: NgxSpinnerService,
    public languageService: LanguageService
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
    }, { validator: WizardValidationService.matchingPasswords('password', 'confirmPassword') });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];

  }

  ngOnInit(): void {
    this.languageService.getLanguage();
  }
  ngOnDestroy() {
    this.languageService.unSubscribeLanguage();
  }
  onSubmit(value) {
    if (this.form.valid) {
      this.loader.show();
      this._store.dispatch(new ResetPasswordFormStateAction());
    }
  }

}
