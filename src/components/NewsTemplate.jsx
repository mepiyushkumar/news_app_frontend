import axios from "axios";
import React, { useState } from "react";
import "../css/NewsTemplate.css";
import { useNavigate } from "react-router-dom";
const NewsTemplate = () => {
  const [News, setNews] = useState({
    date: "",
    image: "",
    heading: "",
    body: "",
    tail: "",
  });

  const navigate = useNavigate();

  const handleBack=()=>{
    navigate('/')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...News, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!News.date || !News.image || !News.heading || !News.body || !News.tail) {
        alert("All fields are mandatory. Please fill out all the details.");
        return; // Prevent submission
      }
    try {
      const response = await axios.post(
        "http://localhost:8082/user/create",
        News
      );
      console.log(response);
      alert("News created successfully!!");
      setNews({
        date: "",
        image: "",
        heading: "",
        body: "",
        tail: "",
      });
      navigate('/')
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("News with this data already created");
      } else {
        console.log("Error creating news:", error);
        alert("News failed to create.");
      }
    }
  };

  return (
    <div >
      <form className="center-context" style={{    /*backgroundColor: "#7E7E7E",*/ height:"100vh"}} onSubmit={handleSubmit}>
        <div className="news-template center-context" >
          <div className="labels">
            <label>News Date</label>
            <input
              type="text"
              name="date"
              value={News.date}
              onChange={handleChange}
              required
            />
            <label>Image-URL</label>
            <input
              type="text"
              name="image"
              value={News.image}
              onChange={handleChange}
              required
            />

            <label>Headline</label>
            <input
              type="text"
              name="heading"
              value={News.heading}
              onChange={handleChange}
              required
            />

            <label>Body</label>
            <textarea name="body" value={News.body} onChange={handleChange} required/>

            <label>Tail</label>
            <textarea name="tail" value={News.tail} onChange={handleChange} required/>
            <div className="buttons">
              <button onClick={handleBack}>Back</button>
              <button type="submit">Create News</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsTemplate;
