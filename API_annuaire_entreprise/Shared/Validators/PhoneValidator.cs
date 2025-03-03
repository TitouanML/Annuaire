using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace API_annuaire.Shared.Validators;

public class PhoneValidator : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        var input = value?.ToString();

        ErrorMessage = string.Empty;

        if (string.IsNullOrEmpty(input))
        {
            ErrorMessage = "Le numéro de téléphone doit être renseigné";
            return false;
        }

        var regex = new Regex(@"[0-9]{10}");

        if (!regex.IsMatch(input))
        {
            ErrorMessage = "Le numéro de téléphone n'est pas valide";
            return false;
        }

        return string.IsNullOrEmpty(ErrorMessage);
    }
}