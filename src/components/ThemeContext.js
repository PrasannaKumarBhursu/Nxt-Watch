import React from "react";

const ThemeContext = React.createContext({
  themeColorStatus: false,
  menuBarStatus: false,
  onMenuBarChange: () => {},
  onThemeChange: () => {},
});

export default ThemeContext;
