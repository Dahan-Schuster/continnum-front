import React from "react";
import ModelProgress from "./ModelProgress";

interface HeaderProps {}

/**
 * Header documentation
 */
const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div>
      <ModelProgress />
    </div>
  );
};

export default Header;
