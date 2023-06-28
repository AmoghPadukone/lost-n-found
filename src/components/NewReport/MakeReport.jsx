import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { addDoc, doc, setDoc } from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { dbInstance, storage } from "../../firebaseConfig";
// import app from "../../firebaseConfig";
import classes from "./MakeReport.module.css";

const report = {
  id: "",
  name: "",
  srn: "",
  phone: "",
  classAndSec: "",
  objName: "",
  location: "",
  details: "",
  contactInfo: "",
  imgUrl: "",
  claimLogs: [],
};

const MakeReport = ({ closeDialog }) => {
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [imagePreview, setimagePreview] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [makeReport, setMakeReport] = useState({
    ...report,
    id: v4(),
  });

  const onTextChange = (e) => {
    let changeReport = {
      ...makeReport,
      [e.target.name]: e.target.value,
    };
    setMakeReport(changeReport);
  };

  //function to upload image to browser
  const handleUpload = (e) => {
    setFileUploadStatus(true);
    setimagePreview(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    // if (uploadedImage === null) {
    //   alert("select an image");
    //   return;
    // }
    async function uploadImage(imgData) {
      await uploadBytes(imgData, uploadedImage);

      //fetching the uploaded image url
      const responseUrl = await getDownloadURL(ref(storage, imgData));
      return responseUrl;
    }

    async function sendSubmission() {
      //code to upload image to firebase
      const imageRef = ref(storage, `/${uploadedImage.name + v4()}`);
      const resUrl = await uploadImage(imageRef);

      const updatedMakeReport = {
        ...makeReport,
        imgUrl: resUrl,
      };

      //basic validation for the time being
      if (makeReport.name && makeReport.srn && makeReport.objName !== "") {
        try {
          // sending the report object to firebase
          // await addDoc(dbInstance, updatedMakeReport);
          await setDoc(
            doc(dbInstance, `${updatedMakeReport.id}`),
            updatedMakeReport
          );
          alert("Report submitted to firebase");

          closeDialog();
        } catch (err) {
          alert("Something went wrong :(");
          console.log(err.message);
        }
      } else {
        alert("Fill all the nescecary input fields");
      }

      setMakeReport(updatedMakeReport);
    }

    sendSubmission();

    ///////////////////////////////////////////////
    //////////////////////////////////////////////////
    // const imageRef = ref(storage, `/${uploadedImage.name + v4()}`);
    // uploadBytes(imageRef, uploadedImage).then(() => {
    //   getDownloadURL(ref(storage, imageRef)).then((url) => {
    //     console.log(url);
    //     let changeReport = { ...makeReport, imgUrl: url };
    //     setMakeReport(changeReport);
    //   });

    //   alert("image uploaded ");
    //   // console.log(makeReport);
    // });
    // if (
    //   makeReport.name &&
    //   makeReport.srn &&
    //   makeReport.objName  !== ""
    // ) {
    //   addDoc(dbInstance, makeReport)
    //     .then(() => {
    //       alert("Report submitted");
    //     })
    //     .catch((err) => {
    //       alert("Something went wrong :(");
    //       console.log(err.message);
    //     });
    // } else {
    //   alert("Fill all the nescecary input fields");
    // }

    // alert("Posted successfully, you may now close the form");
  };

  return (
    <>
      {/* <DialogContent>
      </DialogContent> */}

      <Box sx={{ display: "flex" }}>
        <Box
          className={classes.inputContianter}
          sx={{
            overflow: "auto",
            maxHeight: "80vh",
            width: "180%",
          }}
        >
          <div style={{ minWidth: "100%", padding: " 5% 10%" }}>
            <p style={{ fontSize: "1.7rem", marginBottom: "2rem" }}>
              Fill out your details:
            </p>
            <TextField
              id="outlined-basic"
              label="Name"
              placeholder="Amogh Padukone"
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="name"
              value={makeReport.name}
            />
            <TextField
              id="outlined-basic"
              label="SRN"
              variant="outlined"
              fullWidth
              placeholder="R21EJ094"
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="srn"
              value={makeReport.srn}
            />
            <TextField
              id="outlined-basic"
              label="Phone Number (Optional)"
              placeholder="+91 XXXXX XXXXX"
              variant="outlined"
              fullWidth
              type="number"
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="phone"
              value={makeReport.phone}
            />
            <TextField
              id="outlined-basic"
              label="Class & Section"
              variant="outlined"
              placeholder="CSIT B"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="classAndSec"
              value={makeReport.classAndSec}
            />
            <TextField
              id="outlined-basic"
              label="Object Name"
              placeholder="iPhone 13"
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="objName"
              value={makeReport.objName}
            />
            <TextField
              id="outlined-basic"
              label="Room no. or Location Name"
              placeholder="Room 424 in SVB || Saughandhika || Foodcourt"
              variant="outlined"
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="location"
              value={makeReport.location}
            />
            <TextField
              id="outlined-basic"
              label="More Details on where you found it"
              placeholder="First bench in room 424 in SVB"
              variant="outlined"
              multiline
              maxRows={4}
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                marginBottom: "2rem",
              }}
              onChange={(e) => onTextChange(e)}
              name="details"
              value={makeReport.details}
            />
            <span
              style={{
                letterSpacing: ".11ch",
                opacity: ".5",
                paddingLeft: "1rem",
                fontSize: ".75rem",
              }}
            >
              [optional if you've entered phone number]
            </span>
            <TextField
              id="outlined-basic"
              label="Addition means of reaching you"
              placeholder="Your social media handles..."
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              sx={{
                boxShadow: " 5px 5px 1px rgb(0,0,0)",
                margin: ".75rem 0",
              }}
              onChange={(e) => onTextChange(e)}
              name="contactInfo"
              value={makeReport.contactInfo}
            />
            <Typography
              sx={{
                mt: "2rem",
                letterSpacing: ".15ch",
                textAlign: "center",
              }}
            >
              We request you to keep the item with you until the appropriate
              person contacts you
              <br /> 🙇‍♂️🙇‍♀️🙇‍♂️🙇‍♀️
            </Typography>
          </div>
        </Box>
        <Box
          className={classes.uploadContainer}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-between",
          }}
        >
          <Box className={classes.uploads} sx={{ textAlign: "center" }}>
            {!fileUploadStatus && (
              <Box>
                <Typography
                  fontSize={"1.5rem"}
                  sx={{ lineHeight: "4rem", paddingTop: "20%" }}
                >
                  {" "}
                  Upload a clear image{" "}
                </Typography>
                <Box
                  sx={{
                    margin: "1rem",
                    padding: "6rem",
                    display: "inline-flex",
                    borderRadius: "10px",
                    border: "2.5px solid ",
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "relative",
                      margin: "auto",
                      width: "100%",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUpload}
                    />
                    {}
                    <AddPhotoAlternateIcon
                      fontSize={"large"}
                      sx={{
                        color: "#000",
                        fontSize: "3em",
                        "&:hover": {
                          //   backgroundColor: "#E5FFD1",
                          //   borderColor: "#E5FFD1",
                          transition: "all .3s",
                          padding: "5%",
                          borderRadius: "50%",
                          boxShadow: " 5px 5px 1px rgb(0,0,0)",
                          border: "2px solid #000",
                        },
                        "&:active": { transform: "scale(.9)" },
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            )}
            {fileUploadStatus && (
              <Box>
                <Box
                  sx={{
                    display: "inline-flex",
                    // borderRadius: "10px",
                    // border: "2.5px solid ",
                    paddingTop: "10%",
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "relative",
                      margin: "auto",
                      width: "100%",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleUpload}
                    />
                    {}
                    <AddPhotoAlternateIcon
                      fontSize={"large"}
                      sx={{
                        color: "#000",
                        fontSize: "2em",
                        "&:hover": {
                          //   backgroundColor: "#E5FFD1",
                          //   borderColor: "#E5FFD1",
                          transition: "all .3s",
                          padding: "5%",
                          borderRadius: "50%",
                          boxShadow: " 5px 5px 1px rgb(0,0,0)",
                          border: "2px solid #000",
                        },
                        "&:active": { transform: "scale(.9)" },
                      }}
                    />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    // padding: "7px 0px 10px 10px",
                    margin: "1rem",
                    borderRadius: "10px",
                    border: "2.5px solid ",
                  }}
                >
                  <img
                    src={imagePreview}
                    style={{ objectFit: "cover", margin: "5px" }}
                    id="outputImage"
                    alt="user uploaded image"
                    width="350"
                    height="400"
                  />
                </Box>
              </Box>
            )}
          </Box>
          <Box
            className={classes.button}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "10%",
            }}
          >
            <Button
              onClick={handleSubmit}
              // onClick={closeDialog}
              sx={{
                width: "70%",
                height: "70px",
                margin: "auto",
                // padding: "1.1em 0",
                fontSize: "1.5rem",
                color: "#000",
                backgroundColor: "#E5FFD1",
                border: "1px solid #000",
                // boxShadow: " 5px 5px  rgb(0,0,0)",
                borderRadius: "10px",

                "&:hover": {
                  boxShadow: " 5px 5px  rgb(0,0,0)",
                  backgroundColor: "#E5FFD1",

                  border: "2px solid #000",
                  //   border: "2px solid #000",
                },
                "&:active": {
                  backgroundColor: "#E5FFD1",

                  boxShadow: " none",
                  transform: "translate(5px ,5px)",
                  //   transform: "scale(.9)",
                  transition: "none",
                  border: "2px solid #000",
                },
              }}
              disableElevation
              size="large"
              variant="contained"
              endIcon={
                <SendIcon
                  style={{
                    fontSize: "1.5em",
                  }}
                />
              }
            >
              POST
            </Button>{" "}
          </Box>
        </Box>
      </Box>

      {/* <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Subscribe</Button>
      </DialogActions> */}
    </>
  );
};

export default MakeReport;
