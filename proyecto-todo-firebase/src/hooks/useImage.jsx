import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import {
  getUserProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../../firebase/firebase.js";

export const useImage = () => {
  const { user, reload, setReload } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const getProfileImage = async () => {
      if (user?.profilePicture) {
        const res = await getUserProfilePhotoUrl(user.profilePicture);
        setProfileImage(res);
      }
    };
    getProfileImage();
  }, [user, reload]);

  const handleFileSelected = (e) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileUpload = async (e) => {
    try {
      e.preventDefault();
      if (selectedImage) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(selectedImage);
        fileReader.onload = async () => {
          try {
            const imageData = fileReader.result;
            const res = await setUserProfilePhoto(user.uid, imageData);
            await updateUser(user, res.metadata.fullPath);
            setPreviewImage(null);
            setReload(!reload);
          } catch (error) {
            console.log(error);
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    previewImage,
    setPreviewImage,
    profileImage,
    setProfileImage,
    handleFileSelected,
    handleFileUpload,
  };
};
