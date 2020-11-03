export interface FormStateModel {
    login: any;
    signup: any;
    forgotPassword: any;
    resetPassword: any;
}

export const DefaultFormStateModel: FormStateModel = {
    login: {
        model: {},
        dirty: false,
        status: '',
        errors: {}
    },
    signup: {
        model: {},
        dirty: false,
        status: '',
        errors: {}
    },
    forgotPassword: {
        model: {},
        dirty: false,
        status: '',
        errors: {}
    },
    resetPassword: {
        model: {},
        dirty: false,
        status: '',
        errors: {}
    }
}

