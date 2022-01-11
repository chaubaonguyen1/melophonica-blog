import "./write.css";
import { useState, useEffect, useContext } from "react";
import { Context } from '../../context/Context'
import { axiosInstance } from "../../config";


export default function Write() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [avatar, setAvatar] = useState();

  const { user } = useContext(Context);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  useEffect(() => {
    //cleanup
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description
    };
    if (avatar) {
      const data = new FormData();
      const filename = Date.now() + avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch {

      }
    }
    try {
      const response = await axiosInstance.post("/posts", newPost);
      //redirect users to the newly written post
      window.location.replace("/post/" + response.data._id);
    } catch {

    }
  }

  return (
    <div className="write">
      {avatar && (
        <img
        className="writeImg"
        src={avatar.preview}
        alt=""
      />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" hidden onChange={handlePreviewAvatar} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
//1:08:20
