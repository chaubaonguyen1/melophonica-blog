import "./post.css";
import "./responsive.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  //Post from Home.jsx
  const publicFolder = "https://melophonica-blog.herokuapp.com/images/";
  return (
    <div className="post">
      {post.photo && (
        <Link to={`/post/${post._id}`} className="link">
          <img className="postImg" src={publicFolder + post.photo} alt="" />
        </Link>
      )}
      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map((category, index) => (
            // <span className="postCategory">{(post.categories).join(', ')}</span>
            <span className="postCategory" key={index}>
              {category.name}
            </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toLocaleString()}
        </span>
        <span className="postAuthor">
          <Link to={`/?user=${post.username}`} className="link">
            Author: <b>{post.username}</b>
          </Link>
        </span>
      </div>
      <p className="postDescription">{post.description}</p>
    </div>
  );
}
