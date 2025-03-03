import React, { useEffect, useState } from 'react';
import BacklogTable from '../../components/ui/BacklogTable';
import { deleteSite, getAllSites, restoresite } from '../../utils/sites';
import AdminSiteGalleryItem from '../../components/ui/AdminSiteGalleryItem';
import DeleteSite from './DeleteSite';
import RestoreSite from './RestoreSite';

const AdminSiteList = ({ isDisplayed, includeDeleted, siteList, setSiteList, searchTerm }) => {
    const [isOpenedDeletion, setIsOpenedDeletion] = useState(false);
    const [isOpenedRestoration, setIsOpenedRestoration] = useState(false);
    const [examinedSite, setExaminedSite] = useState(null);

    useEffect(() => {
        const fetchSites = async () => {
            const sites = await getAllSites("sites");
            setSiteList(sites); // Mise à jour directe du state
        };
        fetchSites();
    }, [includeDeleted, setSiteList]);

    const openingPopUp = (site) => {
        setIsOpenedDeletion(true);
        setExaminedSite(site);
    };

    const onCloseDeletion = () => {
        setIsOpenedDeletion(false);
        setExaminedSite(null);
    };

    const openingRestoration = (site) => {
        setIsOpenedRestoration(true);
        setExaminedSite(site);
    };

    const onCloseRestoration = () => {
        setIsOpenedRestoration(false);
        setExaminedSite(null);
    };

    const onConfirmRestoration = async () => {
        await restoresite(examinedSite.id, setSiteList, siteList);
        setIsOpenedRestoration(false);
    };

    const onConfirmDeletion = async () => {
        await deleteSite(examinedSite.id, setSiteList, siteList);
        setIsOpenedDeletion(false);
    };

    // Filtrage des sites en fonction du `searchTerm`
    const filteredSiteList = Array.isArray(siteList) ? siteList.filter((site) => {
        if (!searchTerm || searchTerm.length < 3) return true;
        return (`${site.name} ${site.city}`).toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    // Filtrage des sites supprimés/non supprimés selon `includeDeleted`
    const displayedSites = filteredSiteList.filter((site) => {
        if (includeDeleted === null) return true;
        return includeDeleted ? !!site.deletedAt : !site.deletedAt;
    });

    if (!isDisplayed) return null;

    return (
        <>
            <BacklogTable>
                {displayedSites.length > 0 ? (
                    displayedSites.map((site, idx) => (
                        <AdminSiteGalleryItem
                            key={site.id}
                            site={site}
                            openingPopUp={() => openingPopUp(site)}
                            openingRestoring={() => openingRestoration(site)}
                            isLast={idx === displayedSites.length - 1}
                        />
                    ))
                ) : (
                    <span>Aucun site à afficher</span>
                )}
            </BacklogTable>

            <DeleteSite 
                isOpen={isOpenedDeletion} 
                onClose={onCloseDeletion} 
                onConfirm={onConfirmDeletion} 
            />
            <RestoreSite 
                isOpen={isOpenedRestoration} 
                onClose={onCloseRestoration} 
                onConfirm={onConfirmRestoration} 
            />
        </>
    );
};

export default AdminSiteList;
