const { checkEmail_validation, checkPassword_validation } = require('./validation');

const handleSignUp_errors = (err) => {
	const errors = { email: "", password: "" };

    // duplicated email error 
    if(err.message==="duplicated email"){
        errors.email = "that email is already registered";
		return errors;
    }
}

const handleLogIn_errors = (err) => {
	const errors = { email: "", password: "" };

    // unregistered email
    if(err.message ==="unregistered email"){
        errors.email = "that email is not registered";
		return errors;
    }

    // incorrect password
    if(err.message === "incorrect password"){
        errors.password = "incorrect password";
        return errors;
    }

}

const handleValidation_errors = (email, password) => {
    const errors = { email: "", password: "" };
    const emailValid = checkEmail_validation(email);
    const passValid = checkPassword_validation(password);

    if(emailValid && passValid){
        return;
    }
    if(!emailValid){
        errors.email = "invalid email";
    }
    if(!passValid){
        errors.password = "Minimum eight characters, at least one letter and one number";
    }
    return errors;
}

const handleLogInValidation_errors = (email) => {
    const errors = { email: "", password: "" };
    const emailValid = checkEmail_validation(email);
    if(emailValid){
        return;
    }
    if(!emailValid){
        errors.email = "invalid email";
    }
}

module.exports = {
    handleSignUp_errors,
    handleValidation_errors,
    handleLogInValidation_errors,
    handleLogIn_errors
}