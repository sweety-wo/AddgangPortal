import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ResetAccountStateAction } from '../../states/account';
import { SignUpFormSubmitAction } from '../../states/form';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { NgxSpinnerService } from 'ngx-spinner';
import { WizardValidationService } from '../form-elements/wizard/wizard-validation.service';
import * as moment from 'moment';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'az-register',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [WizardValidationService]
})
export class RegisterComponent implements OnInit, OnDestroy {
    public router: Router;
    public form: FormGroup;
    public sex = [{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }];
    defaultSex = 'male';
    public today = moment().format('YYYY-MM-DD');
    constructor(
        router: Router,
        fb: FormBuilder,
        public translate: TranslateService,
        private _store: Store,
        public loader: NgxSpinnerService,
        public languageService: LanguageService
    ) {
        this.router = router;
        this.form = fb.group({
            userName: ['', Validators.compose([Validators.required, WizardValidationService.emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            fullName: ['', Validators.required],
            surName: ['', Validators.required],
            DOB: ['', Validators.compose([Validators.required, WizardValidationService.validateDOB])],
            sex: ['', Validators.required],
            mobileNo: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
        }, { validator: WizardValidationService.matchingPasswords('password', 'confirmPassword') });

        this.form.controls['sex'].setValue(this.defaultSex, { onlySelf: true });
    }

    ngOnInit() {
        this.languageService.getLanguage();
    }
    ngOnDestroy() {
        this.languageService.unSubscribeLanguage();
        this.fnResetSignUpFormState();
        this._store.dispatch(new ResetAccountStateAction());
    }
    public onSubmit(values: Object): void {
        console.log(this.form);

        if (this.form.valid) {
            this.loader.show();
            this._store.dispatch(new SignUpFormSubmitAction());
        }
    }

    get controls() {
        return this.form.controls;
    }

    private fnResetSignUpFormState() {
        this._store.dispatch(
            new UpdateFormValue({ value: {}, path: 'form.signup' })
        );
    }


    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}