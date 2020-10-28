export interface FormStateModel {
    login: any;
    signup: any;
    forgotPassword: any;
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
    }
}
    
