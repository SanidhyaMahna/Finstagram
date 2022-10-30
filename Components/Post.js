import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Comment from './Comments';
import DisplayComments from "./DisplayComments";
import * as ReactDOM from 'react-dom';
import { useRouter } from "next/router";

function Post({ postData, userData }) {
  // console.log("123456",postData);
  const [like, setLike] = useState(false);
  // heart red -> jab logged in user ne like kia hta h
  const [open, setOpen] = React.useState(false);
  const [isMuted, setIsMuted] = useState(true)
  const router = useRouter();
  const handleClickOpen = () => {
    console.log("dialog opened");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("dialog closed");
    setOpen(false);
  };
  // useEffect(() => {
  //   if(!userData){
  //     router.push("/login");
  //   }
  // },[userData])
  useEffect(() => {
    if (postData.likes.includes(userData.uid)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [postData]);

  const handleLike = async () => {
    if (like) {
      //unlike
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayRemove(userData.uid),
      });
    } else {
      //like
      // likes["12345677iuyhtgfrd"]
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayUnion(userData.uid),
      });
    }
  };

  const handleMute = () => {
    if(isMuted){
      setIsMuted(false);
    }
    else setIsMuted(true);
  }

  const handleNextVideo = (e)=>{
    let nextVideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if(nextVideo){
      nextVideo.scrollIntoView({behavior : "smooth"});
    }
  }

  return (
    <div className="post-container">
      <video 
      src={postData.postURL} 
      muted = {isMuted}
      onClick = {handleMute}
      onEnded = {handleNextVideo}
      // controls
      />
      <div className="videos-info">
        <div className="avatar-container">
          <Avatar
            alt="sandy Sharp"
            src={postData.profilePhotoURL}
            sx={{ margin: "0.5rem" }}
          />
          <p style={{ color: "white" }}>{postData.profileName}</p>
        </div>
        <div className="post-like">
          <FavoriteIcon
            style={like ? { color: "red" } : { color: "white" }}
            onClick={handleLike}
          />
          <p style={{ color: "white" }}>{postData.likes.length}</p>
          <AddCommentIcon
            onClick={handleClickOpen}
            style={{ color: "white" }}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="md"
          >
            <div className="modal-container">
              <div className="video-modal">
                <video autoPlay controls muted src={postData.postURL} />
              </div>
              <div className="comments-modal">
                <Card className="card1"><DisplayComments postData = {postData} /></Card>
                <Card className="card2">
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {postData.likes.length == 0
                      ? "Be the first one to like this post"
                      : `Liked by ${postData.likes.length} users`}
                  </Typography>
                  {/* heart is added */}
                  <div className="post-like2">
                    <FavoriteIcon
                      style={like ? { color: "red" } : { color: "black" }}
                      onClick={handleLike}
                    />
                    <Comment userData={userData} postData = {postData} />
                  </div>
                </Card>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Post;