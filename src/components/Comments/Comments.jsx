import React, { useState, useEffect , useContext} from "react";
import axios from "axios";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Link } from "react-router-dom";
import {UserContext} from '../../contexts/userContext'
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [show, setIsShow] = useState(true);
  const [text, setText] = useState("Hide Comments");
  const [color,setColor] = useState("--color-reds")
  const {currentUser} = useContext(UserContext)
  useEffect(() => {
    const getpostcomment = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setComments(response?.data?.comments);
      } catch (error) {
        console.log(error);
      }
    };
    getpostcomment();
  });

  const toggle = () => {
    if (show) {
      setIsShow(false);
      setText("Show Comments");
      setColor("--color-greens")
    } else {
      setIsShow(true);
      setText("Hide Comments");
      setColor("--color-reds")
    }
  };

  return (
    <div className="containers mt-1 thiscomment">
      <div className="containers mb-2 mt-2 d-flex justify-content-end">
        <button style={{background:`var(${color})`}} className="btns primarys text-white" onClick={toggle}>
          {text}
        </button>
      </div>
      {show && (comments.length === 0 ? (
        <p className="centers mt-0">No comments yet...</p>
      ) : (
        comments.map((commentObj, ind) => {
          return (
            <div key={ind} className="mb-1 containers">
              <div
                style={{
                  background: "var(--color-white)",
                  width: "var(--form-width)",
                }}
                className="containers p-3 mx-auto w-100 Hey"
              >
                <Link className="helo post__author" to={`/posts/users/${currentUser.id}`}>
                  <div className="post__author-avatar">
                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${commentObj.userID}`}
                      alt=""
                    />
                  </div>
                  <div className="post__author-details d-flex">
                    <p
                      className="com"
                      style={{
                        color: "dodgerblue",
                        textTransform: "capitalize",
                      }}
                    >
                      {commentObj.commentedUser}
                    </p>
                    <small className="time ms-3">
                      <ReactTimeAgo
                        date={new Date(commentObj.times)}
                        locale="en-US"
                      />
                    </small>
                  </div>
                </Link>
                <p
                  style={{
                    fontFamily: "fantasy",
                    color: "lightseagreen",
                  }}
                  className="ps-4 ms-2"
                >
                  <FcComments className="me-2" />
                  {commentObj.comment}
                </p>
              </div>
            </div>
          );
        })
      ))}
    </div>
  );
}

export default Comments;