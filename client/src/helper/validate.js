import toast from 'react-hot-toast';
/** Validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);
    return errors;
}
/**Val Password Function */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}

/** validate reset password */
export async function resetPasswordValidate(values){
    const errors = passwordVerify({}, values);
    
    if(values.password !== values.confirm_pwd){
        errors.exist =toast.error('Password match incorect...!');
    }
    return errors; 
}
/** val register form*/
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}
/** Validate Profile */
export async function profileValidations(values){
    const errors = emailVerify({}, values);
    return errors;
}
/******************************************************** */
/** Verify Username */
function usernameVerify(error = {}, values){
    if (!values.username){
        error.username = toast.error("Please enter a username!!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username!!");
    }

    return error;    
}

/**Verify Password */
function passwordVerify(errors= {}, values){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
 
    if (!values.password){
        errors.password = toast.error("Please enter a password");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("Invalid Password Credentials");    
    }else if(values.password.length < 6){
        errors.password = toast.error("Password must not be less than 6 characters");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have a special character");
    }
    return errors;
}
/**Verify email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email required...!");
    }else if(values.email.includes("")){
        error.email =  toast.error("Wrong Email...!");
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.{2,4}$/.test(values.email)){
        error.email = toast.error("Invalid Email Address...!");


    }
    return error;
}  