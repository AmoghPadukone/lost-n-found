import { CenterFocusStrong, Padding } from "@mui/icons-material";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

const InfoCard = ({ info }) => {
  return (
    <Card sx={{ border: "1px solid #000", borderRadius: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          sx={{ objectFit: "contain", padding: "5px 0 0 0" }}
          image={info.image}
          alt={info.imageAlt}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {info.title}
            {/* Here to report a article? */}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            [Click to open a step by step guide]
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InfoCard;
