using API_annuaire.API.Administrators.DTO;
using API_annuaire.API.Administrators.Models;

namespace API_annuaire.API.Administrators.Extensions
{
    public static class AdministratorExtension
    {
        public static Administrator MapToModel(this CreateAdministratorDTO newAdministrator)
        {
            return new Administrator()
            {
                LastName = newAdministrator.LastName,
                FirstName = newAdministrator.FirstName,
                Email = newAdministrator.Email,
            };
        }

        public static Administrator MapToModel(this UpdateAdministratorDTO updatedAdministrator)
        {
            return new Administrator()
            {
                LastName = updatedAdministrator.LastName,
                FirstName = updatedAdministrator.FirstName,
                Email = updatedAdministrator.Email,
            };
        }

        public static ReturnAdministratorDTO MapToReturn(this Administrator administrator)
        {
            return new ReturnAdministratorDTO()
            {
                Id = administrator.Id,
                LastName = administrator.LastName,
                FirstName = administrator.FirstName,
                Email = administrator.Email,
                DeletedAt = administrator.DeletedAt,
            };
        }
    }
}
