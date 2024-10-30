    // src/types/react-form-buddy.d.ts
declare module 'react-form-buddy' {
    const FormHandler: (submitForm: any, validate: any) => {
        handleChange: (e: any) => void;
        handleSubmit: (e: any) => void;
        values: any;
        errors: any;
    };
    export default FormHandler;
}
