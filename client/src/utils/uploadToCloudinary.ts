import axios from "axios";

const uploadToCloudinary = async (file: File, index: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ts-mechat");
  const url = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUD_NAME
  }/image/upload`;
  /***@ts-ignore*/
  const { data } = await axios.post(url, formData);
  // const data = { secure_url: "safbs"}
  return { profilePhotoURL: data?.secure_url, index };
};

export default uploadToCloudinary;
