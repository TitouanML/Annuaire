import React from 'react';

const Icon = ({iconName}) => {
    return (
        <img className='w-[40px] h-[40px] icon' src={require(`../../assets/icons/${iconName.toLowerCase()}.svg`)} alt={iconName} />
    );
};

export default Icon;