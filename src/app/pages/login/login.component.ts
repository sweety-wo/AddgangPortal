import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ResetAccountStateAction } from 'src/app/states/account';
import { LoginFormSubmitAction } from 'src/app/states/form';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { NgxSpinnerService } from 'ngx-spinner';
import { WizardValidationService } from '../form-elements/wizard/wizard-validation.service';
import { LanguageService } from 'src/app/services/language/language.service';


@Component({
    selector: 'az-login',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [WizardValidationService]
})
export class LoginComponent {
    public form: FormGroup;
    public email: AbstractControl;
    public femail: AbstractControl;
    public password: AbstractControl;
    public loadingPresent: boolean = false;

    constructor(
        public router: Router,
        public fb: FormBuilder,
        public translate: TranslateService,
        private _store: Store,
        public loader: NgxSpinnerService,
        public languageService: LanguageService
    ) {
        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, WizardValidationService.emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];

    }
    ngOnInit() {
        this.languageService.getLanguage();
    }
    ngOnDestroy() {
        this.languageService.unSubscribeLanguage();
        this.fnResetLoginFormState();
        this._store.dispatch(new ResetAccountStateAction())
    }

    public async onSubmit(values: Object) {
        if (this.form.valid) {
            this.loader.show()
            await this._store.dispatch(new LoginFormSubmitAction(this.form.value));
        }
    }

    private fnResetLoginFormState() {
        this._store.dispatch(
            new UpdateFormValue({ value: {}, path: 'form.login' })
        );
    }

    public fnForgotPassword() {
        this.router.navigate(['forgot-password'])
    }




}