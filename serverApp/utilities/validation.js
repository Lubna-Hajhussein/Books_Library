const checkEmail_validation = (email) => {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return !!email.match(emailRegEx);
}

const checkPassword_validation = (password) => {
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    return !!password.match(passwordRegExp);
}

module.exports = {
    checkEmail_validation,
    checkPassword_validation
}