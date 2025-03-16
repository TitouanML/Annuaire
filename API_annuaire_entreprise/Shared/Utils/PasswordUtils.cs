using System.Security.Cryptography;
using System.Text;

namespace MonApi.Shared.Utils
{
    public class PasswordUtils
    {
        private const int keySize = 64; // Taille de la clé dérivée
        private const int iterations = 350000; // Nombre d'itérations pour le hachage PBKDF2

        /// <summary>
        /// Hache un mot de passe en utilisant PBKDF2 avec SHA-512.
        /// </summary>
        /// <param name="password">Le mot de passe en clair</param>
        /// <param name="salt">Le salt généré pour renforcer le hachage</param>
        /// <returns>Le mot de passe haché sous forme de chaîne hexadécimale</returns>
        public static string HashPassword(string password, out byte[] salt)
        {
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

            // Génération d'un sel aléatoire
            salt = RandomNumberGenerator.GetBytes(keySize);

            // Hachage du mot de passe avec PBKDF2
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash); // Retourne le hachage sous forme de chaîne hexadécimale
        }

        /// <summary>
        /// Vérifie si un mot de passe correspond à un hachage stocké.
        /// </summary>
        /// <param name="password">Le mot de passe en clair</param>
        /// <param name="hash">Le hachage stocké sous forme hexadécimale</param>
        /// <param name="salt">Le salt utilisé lors du hachage initial</param>
        /// <returns>True si le mot de passe est valide, sinon False</returns>
        public static bool VerifyPassword(string password, string hash, byte[] salt)
        {
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

            // Hachage du mot de passe donné avec le même salt et les mêmes paramètres
            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);

            // Comparaison sécurisée des hachages pour éviter les attaques par temporisation
            return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hash));
        }
    }
}
