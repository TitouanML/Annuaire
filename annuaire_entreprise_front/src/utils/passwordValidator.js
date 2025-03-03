export const validatePassword = (password) => {
    let errors = "";
  
    // Vérification de la longueur (min 7 caractères)
    if (password.length < 7) {
        errors = "Le mot de passe doit contenir au moins 7 caractères.";
    }
    // Vérification d'une lettre majuscule
    else if (!/[A-Z]/.test(password)) {
        errors = "Le mot de passe doit contenir au moins une lettre majuscule.";
    }
    // Vérification d'un caractère spécial
    else if (!/[^a-zA-Z0-9]/.test(password)) {
        errors = "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&* etc.).";
    }
  
    // Si aucune erreur, retourner l'état valide
    return errors.length === 0 ? { valid: true } : { valid: false, errors };
  };
  