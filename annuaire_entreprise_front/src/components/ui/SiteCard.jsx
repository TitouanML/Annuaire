import React from 'react';

const SiteCard = ({ site, onClick, employeeCount }) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl p-6 text-center transition duration-200"
        >
            <img
                src={require("../../assets/icons/sites.svg").default}
                alt="Icône de site"
                className="mx-auto mb-4 h-16 w-16 bg-gray-800 rounded-sm"
            />
            <h2 className="text-xl font-semibold text-gray-800">{site.name}</h2>
            <p className="text-gray-600">{site.city} - {site.zipCode}</p>
            <p className="text-gray-500 mt-2">{employeeCount} employé{employeeCount > 1 ? 's' : ''}</p>
        </div>
    );
};

export default SiteCard;
