import { Box, Grid } from "@mui/material";
import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbInstance } from "../../firebaseConfig";
import ReportCard from "./ReportCard";
// import classes from "./Posts.module.css";

const Posts = (props) => {
  //   let PostsObj = [];
  const [posts, setPosts] = useState([]);
  //fetching posts from firebase
  const getPosts = async () => {
    const data = await getDocs(dbInstance);
    const PostsObj = data.docs.map((item) => {
      return { ...item.data() };
    });
    // console.log(data);
    setPosts(PostsObj);
    // for some reason it is printing this twice??
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box sx={{ padding: "3% 5%" }}>
      <Grid container spacing={3} justifyContent="flex-start">
        {posts.map((item, index) => (
          <Grid
            zeroMinWidth
            style={{ wordWrap: "break-word" }}
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            key={index}
          >
            <ReportCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;
