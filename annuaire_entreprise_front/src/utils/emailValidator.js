export const validateEmail = (email) => {
    let errors = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) errors = "L'email n'est pas valide";
    return errors.length === 0 ? {valid:true} : {valid:false, errors} 
};