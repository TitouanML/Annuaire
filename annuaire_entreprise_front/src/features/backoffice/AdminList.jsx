import React, { useEffect, useState } from "react";
import { deleteAdmin, getAllAdministrators, restoreAdmin } from "../../utils/administrators";
import AdminGalleryItem from "../../components/ui/AdminGalleryItem";
import DeleteAdmin from "./DeleteAdmin";
import RestoreAdmin from "./RestoreAdmin";
import BacklogTable from "../../components/ui/BacklogTable";

const AdminList = ({ isDisplayed, includeDeleted = null, setAdminList, adminList, searchTerm }) => {
  const [isOpenedDeletion, setIsOpenedDeletion] = useState(false);
  const [isOpenedRestoration, setIsOpenedRestoration] = useState(false);
  const [examinedAdmin, setExaminedAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      const admins = await getAllAdministrators(includeDeleted);
      setAdminList(admins); // Mise à jour directe
    };
    fetchAdmin();
  }, [includeDeleted, setAdminList]);

  const openingPopUp = (admin) => {
    setIsOpenedDeletion(true);
    setExaminedAdmin(admin);
  };

  const onCloseDeletion = () => {
    setIsOpenedDeletion(false);
    setExaminedAdmin(null);
  };

  const openingRestoration = (admin) => {
    setIsOpenedRestoration(true);
    setExaminedAdmin(admin);
  };

  const onCloseRestoration = () => {
    setIsOpenedRestoration(false);
    setExaminedAdmin(null);
  };

  const onConfirmRestoration = async () => {
    await restoreAdmin(examinedAdmin.id, setAdminList, adminList);
    setIsOpenedRestoration(false);
  };

  const onConfirmDeletion = async () => {
    await deleteAdmin(examinedAdmin.id, setAdminList, adminList);
    setIsOpenedDeletion(false);
  };

  // Filtrage des administrateurs en fonction du `searchTerm`
  const filteredAdminList = Array.isArray(adminList) ? adminList.filter((admin) => {
    if (!searchTerm || searchTerm.length < 3) return true;
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  }) : [];

  // Filtrer selon `includeDeleted`
  const displayedAdmins = filteredAdminList.filter((admin) => {
    if (includeDeleted === null) return true;
    return includeDeleted ? !!admin.deletedAt : !admin.deletedAt;
  });

  if (!isDisplayed) return null;

  return (
    <>
      <BacklogTable>
        {displayedAdmins.length > 0 ? (
          displayedAdmins.map((admin, idx) => (
            <AdminGalleryItem
              key={admin.id}
              admin={admin}
              openingPopUp={() => openingPopUp(admin)}
              openingRestoring={() => openingRestoration(admin)}
              isLast={idx === displayedAdmins.length - 1}
            />
          ))
        ) : (
          <span>Aucun administrateur à afficher</span>
        )}
      </BacklogTable>

      <DeleteAdmin
        isOpen={isOpenedDeletion}
        onClose={onCloseDeletion}
        onConfirm={onConfirmDeletion}
      />
      <RestoreAdmin
        isOpen={isOpenedRestoration}
        onClose={onCloseRestoration}
        onConfirm={onConfirmRestoration}
      />
    </>
  );
};

export default AdminList;
