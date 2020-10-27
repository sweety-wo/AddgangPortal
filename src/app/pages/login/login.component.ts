import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ResetAccountStateAction } from 'src/app/states/account';
import { ForgotPasswordFormStateAction, LoginFormSubmitAction } from 'src/app/states/form';
import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';


@Component({
    selector: 'az-login',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public router: Router;
    public form: FormGroup;
    public userName: AbstractControl;
    public password: AbstractControl;
    private ngUnsubscribe = new Subject();

    constructor(
        router: Router,
        fb: FormBuilder,
        public translate: TranslateService,
        private _store: Store
    ) {
        this.router = router;
        this.form = fb.group({
            userName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.userName = this.form.controls['userName'];
        this.password = this.form.controls['password'];
        const lang = localStorage.getItem("language");
        translate.setDefaultLang(lang);
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this._store.dispatch(new LoginFormSubmitAction());
        }
    }

    private fnResetLoginFormState() {
        this._store.dispatch(
            new UpdateFormValue({ value: {}, path: 'form.login' })
        );
    }

    public fnForgotPassword() {
        this._store.dispatch(new ForgotPasswordFormStateAction({ userName: this.userName.value }));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.fnResetLoginFormState();
        this._store.dispatch(new ResetAccountStateAction());
    }

    changeLang(lang) {
        this.translate.setDefaultLang(lang);
        localStorage.setItem("language", lang);
    }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

