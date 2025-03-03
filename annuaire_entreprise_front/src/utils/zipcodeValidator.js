export const validateZipCode = (zipCode) => {
  let errors = "";

  if (!/^[0-9]{5}$/.test(zipCode)) {
    errors = "Le code postal doit contenir exactement 5 chiffres.";
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
};