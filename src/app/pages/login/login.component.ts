import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountState, ResetAccountStateAction } from 'src/app/states/account';
import { LoginFormSubmitAction } from 'src/app/states/form';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UpdateFormValue } from '@ngxs/form-plugin';
import { CommonState } from 'src/app/states/common/common.state';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'az-login',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public form: FormGroup;
    public email: AbstractControl;
    public femail: AbstractControl;
    public password: AbstractControl;
    public loadingPresent: boolean = false;
    private ngUnsubscribe = new Subject();
    @Select(AccountState.getIsLoading) isLoading: Observable<any>;

    @Select(CommonState.getState) language: Observable<any>;
    constructor(
        public router: Router,
        public fb: FormBuilder,
        public translate: TranslateService,
        private _store: Store,
        public loader: NgxSpinnerService
    ) {
        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });


        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        // const lang = localStorage.getItem("language");
        // translate.setDefaultLang(lang);
    }
    ngOnInit() {
        this.language.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response: any) => {
                if (response.language) {
                    this.translate.setDefaultLang(response.language);
                } else {
                    this.translate.setDefaultLang("no");
                }
            });
    }

    public async onSubmit(values: Object) {
        console.log(this.form);

        if (this.form.valid) {
            this.loader.show()
            await this._store.dispatch(new LoginFormSubmitAction());
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



    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.fnResetLoginFormState();
        this._store.dispatch(new ResetAccountStateAction())
    }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

