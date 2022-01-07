export const validationOnlyNumbers = (value) => {
    let regExp = /^[0-9]+$/;
    return regExp.test(value);
}

export const validationRequired = (value) => {
    if(value === undefined || value === null || value === ''){
        return false;
    }
    return value.length > 0;
}