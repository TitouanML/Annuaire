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

        public async Task<ReturnAdministratorDTO> AddAsync(CreateAdministratorDTO newAdministrator)
        {
            // Vérification de l'email existant
            if (await _administratorRepositories.AnyAsync(a => a.Email == newAdministrator.Email))
                throw new Exception("Email already used");

            // Mapping du DTO vers le modèle d'administrateur
            Administrator administrator = newAdministrator.MapToModel();

            // Hachage du mot de passe avec un nouveau salt
            administrator.Password = PasswordUtils.HashPassword(newAdministrator.Password, out var salt);

            // Conversion du salt en hexadécimal pour stockage dans la base de données
            administrator.Salt = Convert.ToHexString(salt);

            // Ajout de l'administrateur dans la base de données
            Administrator addedAdministrator = await _administratorRepositories.AddAsync(administrator);

            // Récupération des détails de l'administrateur ajouté
            Administrator addedAdministratorDetails = await _administratorRepositories.FindAsync(addedAdministrator.Id)
                ?? throw new KeyNotFoundException("Id not found");

            // Mapping du modèle vers un DTO de retour
            ReturnAdministratorDTO returnedAdministrator = addedAdministratorDetails.MapToReturn();
            return returnedAdministrator;
        }



        public async Task<string> Login(LoginAdministratorDTO loginDTO)
        {
            // Vérification de l'existence de l'email
            Administrator originalAdministrator = await _administratorRepositories.FirstOrDefaultAsync(a => a.Email == loginDTO.Email)
                ?? throw new Exception("Email not found");

            if(originalAdministrator.DeletedAt != null) throw new Exception("Administrator deleted");

            // Vérification du mot de passe
            bool isPasswordValid = PasswordUtils.VerifyPassword(
                loginDTO.Password,
                originalAdministrator.Password,
                Convert.FromHexString(originalAdministrator.Salt) // Utilisation de FromHexString pour récupérer le salt
            );

            if (!isPasswordValid)
                throw new Exception("Password does not correspond");

            // Création des claims
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
            int expirationHours = int.TryParse(Environment.GetEnvironmentVariable("JWT_EXPIRATION"), out int expHours)
                ? expHours
                : throw new Exception("Invalid or missing JWT_EXPIRATION value");

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

        public async Task<ReturnAdministratorDTO> FindById(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            ReturnAdministratorDTO returnedAdministrator = foundAdministrator.MapToReturn();
            return returnedAdministrator;
        }

        public async Task<ReturnAdministratorDTO> UpdateAsync(UpdateAdministratorDTO updateAdministrator, int id)
        {
            // Charger l'administrateur existant
            Administrator originalAdministrator = await _administratorRepositories.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");

            // Détacher l'entité originale du contexte
            _administratorRepositories.Detach(originalAdministrator);

            // Mapper les données de la mise à jour
            Administrator toUpdateAdministrator = updateAdministrator.MapToModel();
            toUpdateAdministrator.Id = id;
            toUpdateAdministrator.Password = originalAdministrator.Password;
            toUpdateAdministrator.Salt = originalAdministrator.Salt;

            // Mettre à jour l'entité
            await _administratorRepositories.UpdateAsync(toUpdateAdministrator);

            return toUpdateAdministrator.MapToReturn();
        }

        public async Task<ReturnAdministratorDTO> SoftDeleteAsync(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            foundAdministrator.DeletedAt = DateTime.UtcNow;
            await _administratorRepositories.UpdateAsync(foundAdministrator);
            ReturnAdministratorDTO returnAdministratorDTO = foundAdministrator.MapToReturn();
            return returnAdministratorDTO;
        }

        public async Task<ReturnAdministratorDTO> RestoreAsync(int id)
        {
            Administrator foundAdministrator = await _administratorRepositories.FindAsync(id) ?? throw new KeyNotFoundException("Id not found");
            foundAdministrator.DeletedAt = null;
            await _administratorRepositories.UpdateAsync(foundAdministrator);
            ReturnAdministratorDTO returnAdministratorDTO = foundAdministrator.MapToReturn();
            return returnAdministratorDTO;
        }

        public async Task<List<ReturnAdministratorDTO>> GetAll(bool includeDeleted = false)
        {
            List<ReturnAdministratorDTO> administrators = await _administratorRepositories.GetAllAdministrators(includeDeleted);
            return administrators;
        }
    }
}