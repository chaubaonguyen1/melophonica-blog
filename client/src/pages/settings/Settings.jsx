import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { hardImg } from "../../components/topbar/imgLink";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { axiosInstance } from "../../config";

export default function Settings() {
  const publicFolder = "https://melophonica-blog.herokuapp.com/images/";

  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();

  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const handleChangeAvatar = (e) => {
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
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (avatar) {
      const data = new FormData();
      const filename = Date.now() + avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch {}
    }
    try {
      const response = await axiosInstance.put(
        "/users/" + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS" , payload: response.data});
      console.log(response.data)
    } catch {
      dispatch({ type: "UPDATE_FAILURE"});
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile picture</label>
          <div className="settingsPP">
            {avatar ? (
              <img src={avatar.preview || hardImg} alt="" />
            ) : (
              <img src={publicFolder + user.profilePic || hardImg} alt="" />
            )}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={handleChangeAvatar}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            className="settingFocus"
            placeholder={user.username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            className="settingFocus"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            className="settingFocus"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: 20 }}
            >
              Profile has been updated!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
//1:30:57
