import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/NewsTemplate.css';
import '../css/CreateNews.css';

const EditNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { date } = location.state || {}; 
  const [news, setNews] = useState({
    date: '',
    image: '',
    heading: '',
    body: '',
    tail: '',
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/user/get/${date}`);
        setNews(response.data);
      } catch (error) {
        console.log('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("aaaaaaa")
    setNews({ ...news, [name]: value });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8082/user/update/${date}`, news);
      console.log(news);
      alert('News updated successfully!');
      navigate('/'); 
    } catch (error) {
      console.log('Error updating news:', error);
      alert('Failed to update news.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <div className="create-news-heading">
        <h3>Edit News</h3>
      </div>
      <div className="view-news center-context">
        <form onSubmit={handleUpdate} className="news-template center-context">
          <div className="labels">
            <label>News Date</label>
            <input
              type="text"
              name="date"
              value={news.date}
              onChange={handleChange}
              readOnly
            />
            <label>Image-URL</label>
            <input
              type="text"
              name="image"
              value={news.image}
              onChange={handleChange}
              required
            />
            <label>Headline</label>
            <input
              type="text"
              name="heading"
              value={news.heading}
              onChange={handleChange}
              required
            />
            <label>Body</label>
            <textarea
              name="body"
              value={news.body}
              onChange={handleChange}
              required
            />
            <label>Tail</label>
            <textarea
              name="tail"
              value={news.tail}
              onChange={handleChange}
              required
            />
            <div className="buttons">
              <button type="button" onClick={handleBack}>Back</button>
              <button type="submit">Update News</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
