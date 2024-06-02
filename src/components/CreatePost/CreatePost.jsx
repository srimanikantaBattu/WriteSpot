import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../../contexts/userContext";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  useEffect(() => {
    if (!token) navigate("/login");
  }, []);
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const POST_Categories = [
    "Agriculture",
    "Education",
    "Business",
    "Entertainement",
    "Art",
    "Economy",
    "Weather",
    "Cricket",
    "Uncategorized",
  ];

  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An Error Occured");
    }
  };

  return (
    <div className="create-post" style={{ marginBottom: "300px" }}>
      <div className="containers">
        <h2>Create Post</h2>
        {error && <p style={{color:"white"}} className="form__error-message">{error}</p>}
        <form onSubmit={createPost} className="forms create-post__form">
          <input
            type="text"
            name=""
            placeholder="Title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id=""
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id=""
          >
            {POST_Categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            className="q1-editor"
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          ></ReactQuill>
          <label for="images" class="drop-container" id="dropcontainer">
            <span class="drop-title">Drop file here</span>
            <p className="dr">or</p>
            <input
              className=""
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              id="images"
              accept="png,jpg,jpeg"
            />
          </label>
          <button style={{color:"white"}} type="submit" className="btns primarys">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
