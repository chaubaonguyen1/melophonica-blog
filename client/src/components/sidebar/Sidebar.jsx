import "./sidebar.css";
import "./responsive.css";
import { hardImg } from "./hardImg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../../pages/errorpage/ErrorPage";
import { axiosInstance } from "../../config";
export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    };
    getCategory();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem ">
        <span className="sidebarTitle">About us</span>
        <img src={hardImg} alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          quisquam voluptatibus possimus a reprehenderit!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {categories.map((category, index) => (
            <Link
              to={category.name ? `/?category=${category.name}` : <ErrorPage />}
              key={index}
              className="link"
            >
              <li className="sidebarListItem">{category.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
