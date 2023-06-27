import React from "react";

import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer>
      <p className={classes.footerLine}>
        For more enquires reach out to me on amoghpadukone@gmail.com
      </p>
      <p className={classes.footerLine}>
        Made with <span style={{ color: "red" }}>{"<3"}</span> at DevTrack Club
      </p>
    </footer>
  );
};

export default Footer;
