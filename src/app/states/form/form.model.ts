export interface FormStateModel {
    login: any;
    signup: any;
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
    }
};
