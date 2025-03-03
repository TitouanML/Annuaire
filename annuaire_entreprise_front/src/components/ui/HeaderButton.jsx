import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const HeaderButton = ({ buttonName, destination }) => {
  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        `headerLink ${isActive ? "activeHeaderLink" : "inactiveHeaderLink"}`
      }
    >
      <span className="hidden md:block md:text-sm lg:text-md xl:text-xl transition-all">{buttonName}</span>
      <Icon iconName={buttonName} />
    </NavLink>
  );
};

export default HeaderButton;
