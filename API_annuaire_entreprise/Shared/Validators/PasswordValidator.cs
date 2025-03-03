using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace API_annuaire.Shared.Validators;

public class PasswordValidator : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        var input = value?.ToString();

        var messages = new List<string>();

        ErrorMessage = string.Empty;

        if (string.IsNullOrEmpty(input))
        {
            ErrorMessage = "Le mot de passe doit être renseigné";
            return false;
        }

        var hasUpperLetter = new Regex(@"[A-Z]");
        var hasEnoughChars = new Regex(@".{7,}");
        var hasSymbol = new Regex(@"[^a-zA-Z0-9]");

        if (!hasUpperLetter.IsMatch(input))
        {
            messages.Add("Il manque une lettre majuscule.");
        }

        if (!hasEnoughChars.IsMatch(input))
        {
            messages.Add("Le mot de passe doit contenir au moins 7 caractères.");
        }

        if (!hasSymbol.IsMatch(input))
        {
            messages.Add("Il manque un caractère spécial.");
        }

        ErrorMessage = string.Join("\n", messages);

        return string.IsNullOrEmpty(ErrorMessage);
    }
}
