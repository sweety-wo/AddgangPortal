import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ResetAccountStateAction } from '../../states/account';
import { SignUpFormSubmitAction } from '../../states/form';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';

@Component({
    selector: 'az-register',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
    public router: Router;
    public form: FormGroup;
    private ngUnsubscribe = new Subject();
    public sex = [{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }];
    defaultSex = 'male';

    constructor(
        router: Router,
        fb: FormBuilder,
        public translate: TranslateService,
        private _store: Store
    ) {
        this.router = router;
        this.form = fb.group({
            userName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            fullName: ['', Validators.required],
            surName: ['', Validators.required],
            DOB: ['', Validators.required],
            sex: ['', Validators.required],
            mobileNo: ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });

        this.form.controls['sex'].setValue(this.defaultSex, { onlySelf: true });

        const lang = localStorage.getItem("language");
        translate.setDefaultLang(lang);
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
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

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.fnResetSignUpFormState();
        this._store.dispatch(new ResetAccountStateAction());
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