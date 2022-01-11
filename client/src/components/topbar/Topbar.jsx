import "./topbar.css";
import "./responsive.css";
import { hardImg } from "./imgLink";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  console.log('Re-render');
  const handleLogOut = () => {
    dispatch({ type: "LOG_OUT" });
  };

  const publicFolder = "https://melophonica-blog.herokuapp.com/images/";

  return (
    <>
      <div className="top">
        <div className="topLeft">
          <i className="topIcon fab fa-facebook-square"></i>
          <i className="topIcon fab fa-twitter-square"></i>
          <i className="topIcon fab fa-pinterest-square"></i>
          <i className="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="link topListItem">Contact</li>
            <li className="link topListItem">About</li>
            <li className="topListItem">
              <Link className="link" to="/write">
                Write
              </Link>
            </li>
            <li className="link topListItem" onClick={handleLogOut}>
              {user && "Log out"}
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <img
                className="topImg"
                src={publicFolder + user.profilePic || hardImg}
                alt=""
              />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/dang-nhap">
                  Login
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/dang-ky">
                  Register
                </Link>
              </li>
            </ul>
          )}
          <i className="topSearchIcon fas fa-search"></i>
        </div>
      </div>
      <label htmlFor="nav__input" className="topSlide">
        <i className="navbar__mobile fas fa-bars"></i>
      </label>
      <input type="checkbox" hidden name="" id="nav__input" />
      <label htmlFor="nav__input" className="nav__overlay"></label>

      <div className="nav__mobile">
        <label htmlFor="nav__input" className="nav__mobile-close">
          <i className="fas fa-times"></i>
        </label>
        <div className="topRightMobile">
          {user ? (
            <>
            <Link className="link" to="/settings">
              <img
                className="topImgMobile"
                src={publicFolder + user.profilePic || hardImg}
                alt=""
              />
            </Link>
            <span className="link userName">{user.username}</span>
            </>
          ) : (
            <ul className="topListMobile">
              <li className="topListItemMobile">
                <Link className="link" to="/dang-nhap">
                  Login
                </Link>
              </li>
              <li className="topListItemMobile">
                <Link className="link" to="/dang-ky">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="topCenterMobile">
          <ul className="topListMobile">
            <li className="topListItemMobile">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="link topListItemMobile">Contact</li>
            <li className="link topListItemMobile">About</li>
            <li className="topListItemMobile">
              <Link className="link" to="/write">
                Write
              </Link>
            </li>
            <li className="link topListItemMobile" onClick={handleLogOut}>
              {user && "Log out"}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
