using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace API_annuaire.Shared.Validators;

public class ZipCodeValidator : ValidationAttribute
{
    private static readonly Regex ZipCodeRegex = new(@"^\d{5}$", RegexOptions.Compiled);

    public ZipCodeValidator()
    {
        ErrorMessage = "Zipcode is not valid";
    }

    public override bool IsValid(object value)
    {
        if (value is not string input || string.IsNullOrWhiteSpace(input))
        {
            return false;
        }

        return ZipCodeRegex.IsMatch(input);
    }
}
