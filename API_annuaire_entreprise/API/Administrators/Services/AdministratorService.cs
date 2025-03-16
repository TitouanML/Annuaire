using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Extensions;
using API_annuaire.API.Administrators.Models;
using API_annuaire.API.Administrators.Repositories;
using DotNetEnv;
using Microsoft.IdentityModel.Tokens;
using MonApi.Shared.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API_annuaire.API.Administrators.Services
{
    public class AdministratorService : IAdministratorService
    {
        private readonly IAdministratorRepository _administratorRepositories;

        public AdministratorService(IAdministratorRepository administratorRepositories)
        {
            _administratorRepositories = administratorRepositories;
        }

        // Ajout d'un administrateur
        public async Task<ReturnAdministratorDTO> AddAsync(CreateAdministratorDTO newAdministrator)
        {
            if (await _administratorRepositories.AnyAsync(a => a.Email == newAdministrator.Email))
                throw new Exception("Email already used");

            // Mapping du DTO vers le modèle
            Administrator administrator = newAdministrator.MapToModel();

            // Hachage du mot de passe et stockage du salt
            administrator.Password = PasswordUtils.HashPassword(newAdministrator.Password, out var salt);
            administrator.Salt = Convert.ToHexString(salt);

            // Ajout de l'administrateur et récupération de ses détails
            Administrator addedAdministrator = await _administratorRepositories.AddAsync(administrator);
            Administrator addedAdministratorDetails = await _administratorRepositories.FindAsync(addedAdministrator.Id)
                ?? throw new KeyNotFoundException("Administrator ID not found");

            return addedAdministratorDetails.MapToReturn();
        }

        // Connexion d'un administrateur et génération d'un token JWT
        public async Task<string> Login(LoginAdministratorDTO loginDTO)
        {
            // Vérification de l'existence de l'administrateur
            Administrator originalAdministrator = await _administratorRepositories.FirstOrDefaultAsync(a => a.Email == loginDTO.Email)
                ?? throw new Exception("Email not found");

            if (originalAdministrator.DeletedAt != null)
                throw new Exception("Administrator account is deleted");

            // Vérification du mot de passe
            bool isPasswordValid = PasswordUtils.VerifyPassword(
                loginDTO.Password,
                originalAdministrator.Password,
                Convert.FromHexString(originalAdministrator.Salt)
            );

            if (!isPasswordValid)
                throw new Exception("Incorrect password");

            // Création des claims pour le token JWT
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Role, "Administrator"),
                new Claim("AdministratorID", originalAdministrator.Id.ToString()),
                new Claim("Email", originalAdministrator.Email)
            };

            // Récupération du secret JWT
            string key = Environment.GetEnvironmentVariable("JWT_SECRET")
                ?? throw new KeyNotFoundException("JWT_SECRET is missing");

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                SecurityAlgorithms.HmacSha256);

            // Récupération du temps d'expiration du token
            if (!int.TryParse(Environment.GetEnvironmentVariable("JWT_EXPIRATION"), out int expirationHours))
                throw new Exception("Invalid or missing JWT_EXPIRATION value");

            // Création du token JWT
            JwtSecurityToken jwt = new(
                claims: claims,
                issuer: "Issuers",
                signingCredentials: signingCredentials,
                audience: "Audience",
                expires: DateTime.UtcNow.AddHours(expirationHours)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        // Recherche d'un administrateur par ID
        public async Task<ReturnAdministratorDTO> FindById(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id)
                ?? throw new KeyNotFoundException("Administrator ID not found");

            return foundAdministrator.MapToReturn();
        }

        // Mise à jour des informations d'un administrateur
        public async Task<ReturnAdministratorDTO> UpdateAsync(UpdateAdministratorDTO updateAdministrator, int id)
        {
            Administrator originalAdministrator = await _administratorRepositories.FindAsync(id)
                ?? throw new KeyNotFoundException("Administrator ID not found");

            // Détacher l'entité originale du contexte
            _administratorRepositories.Detach(originalAdministrator);

            // Mapper les nouvelles données sans modifier le mot de passe et le salt
            Administrator toUpdateAdministrator = updateAdministrator.MapToModel();
            toUpdateAdministrator.Id = id;
            toUpdateAdministrator.Password = originalAdministrator.Password;
            toUpdateAdministrator.Salt = originalAdministrator.Salt;

            await _administratorRepositories.UpdateAsync(toUpdateAdministrator);

            return toUpdateAdministrator.MapToReturn();
        }

        // Suppression logique d'un administrateur
        public async Task<ReturnAdministratorDTO> SoftDeleteAsync(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id)
                ?? throw new KeyNotFoundException("Administrator ID not found");

            foundAdministrator.DeletedAt = DateTime.UtcNow;
            await _administratorRepositories.UpdateAsync(foundAdministrator);

            return foundAdministrator.MapToReturn();
        }

        // Restauration d'un administrateur supprimé
        public async Task<ReturnAdministratorDTO> RestoreAsync(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id)
                ?? throw new KeyNotFoundException("Administrator ID not found");

            foundAdministrator.DeletedAt = null;
            await _administratorRepositories.UpdateAsync(foundAdministrator);

            return foundAdministrator.MapToReturn();
        }

        // Récupération de tous les administrateurs (avec option pour inclure les supprimés)
        public async Task<List<ReturnAdministratorDTO>> GetAll(bool includeDeleted = false)
        {
            return await _administratorRepositories.GetAllAdministrators(includeDeleted);
        }
    }
}
