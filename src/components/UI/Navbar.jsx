import AddSharpIcon from "@mui/icons-material/AddSharp";
import HelpIcon from "@mui/icons-material/Help";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import logo from "../../assets/logo.webp";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <img className={classes.logo} src={logo} alt="logo"></img>
      <div>
        <Button
          sx={{ margin: "10px" }}
          variant="contained"
          startIcon={<AddSharpIcon style={{ fontSize: 30 }} />}
        >
          Report a lost item
        </Button>
        <IconButton
          color="primary"
          aria-label="help"
          //   sx={{ margin: 0 }}
        >
          <HelpIcon style={{ fontSize: 40 }} />
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
