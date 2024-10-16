import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/NewsTemplate.css'
import Navbar from "./Navbar";
import '../css/CreateNews.css'

const ViewNews = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { date } = location.state || {}; // Safely access date
  const [news, setNews] = useState({
    date: "",
    image: "",
    heading: "",
    body: "",
    tail: "",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/get/${date}`);
        setNews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, [date]); 

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>

      <Navbar/>
      <div className="create-news-heading">
        <h3>View News</h3>
      </div>
    <div className="view-news center-context">
      <div className="news-template center-context">
        <div className="labels">
          <label>News Date</label>
          <input
            type="text"
            name="date"
            value={news.date}
            readOnly 
          />
          <label>Image</label>
          {/* <input
            type="text"
            name="image"
            value={news.image}
            readOnly 
          /> */}
          <img src={news.image} alt="" />
          <label>Headline</label>
          <input
            type="text"
            name="heading"
            value={news.heading}
            readOnly 
          />
          <label>Body</label>
          <textarea
            name="body"
            value={news.body}
            readOnly 
          />
          <label>Tail</label>
          <textarea
            name="tail"
            value={news.tail}
            readOnly 
          />
          <div className="buttons">
            <button onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewNews;
