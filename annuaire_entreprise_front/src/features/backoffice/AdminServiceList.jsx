import React, { useEffect, useState } from 'react';
import BacklogTable from '../../components/ui/BacklogTable';
import { deleteService, getAllServices, restoreService } from '../../utils/services';
import AdminServiceGalleryItem from '../../components/ui/AdminServiceGalleryItem';
import DeleteAdmin from './DeleteAdmin';
import RestoreService from './RestoreService';

const AdminServiceList = ({ isDisplayed, includeDeleted = null, setServiceList, serviceList, searchTerm }) => {

  const [isOpenedDeletion, setIsOpenedDeletion] = useState(false);
  const [isOpenedRestoration, setIsOpenedRestoration] = useState(false);
  const [examinedService, setExaminedService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const services = await getAllServices(includeDeleted);
      setServiceList(services); // Mise à jour directe du state
    };
    fetchService();
  }, [includeDeleted, setServiceList]);

  const openingPopUp = (service) => {
    setIsOpenedDeletion(true);
    setExaminedService(service);
  };

  const onCloseDeletion = () => {
    setIsOpenedDeletion(false);
    setExaminedService(null);
  };

  const openingRestoration = (service) => {
    setIsOpenedRestoration(true);
    setExaminedService(service);
  };

  const onCloseRestoration = () => {
    setIsOpenedRestoration(false);
    setExaminedService(null);
  };

  const onConfirmRestoration = async () => {
    await restoreService(examinedService.id, setServiceList, serviceList);
    setIsOpenedRestoration(false);
  };

  const onConfirmDeletion = async () => {
    await deleteService(examinedService.id, setServiceList, serviceList);
    setIsOpenedDeletion(false);
  };

  // Filtrage des services en fonction du `searchTerm`
  const filteredServiceList = Array.isArray(serviceList) ? serviceList.filter((service) => {
    if (!searchTerm || searchTerm.length < 3) return true;
    return service.name.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  // Filtrage des services supprimés/non supprimés selon `includeDeleted`
  const displayedServices = filteredServiceList.filter((service) => {
    if (includeDeleted === null) return true;
    return includeDeleted ? !!service.deletedAt : !service.deletedAt;
  });

  if (!isDisplayed) return null;

  return (
    <>
      <BacklogTable>
        {displayedServices.length > 0 ? (
          displayedServices.map((service, idx) => (
            <AdminServiceGalleryItem
              key={service.id}
              service={service}
              openingPopUp={() => openingPopUp(service)}
              openingRestoring={() => openingRestoration(service)}
              isLast={idx === displayedServices.length - 1}
            />
          ))
        ) : (
          <span>Aucun service à afficher</span>
        )}
      </BacklogTable>

      <DeleteAdmin 
        isOpen={isOpenedDeletion} 
        onClose={onCloseDeletion} 
        onConfirm={onConfirmDeletion} 
      />
      <RestoreService 
        isOpen={isOpenedRestoration} 
        onClose={onCloseRestoration} 
        onConfirm={onConfirmRestoration} 
      />
    </>
  );
};

export default AdminServiceList;
