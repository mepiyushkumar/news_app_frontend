import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Changed Header to Navbar as per your previous code
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8082/user/get");
        setNewsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  const handleClick = () => {
    navigate("/create-news");
  };

  const handleView = (date) => {
    console.log("View " + date);
    navigate("/view-news", { state: { date } }); 
  };

  const handleEdit = (date) => {
    console.log("Edit " + date);
    navigate("/edit-news", { state: { date } }); 
  };

  const handleDelete = (date) => {
    console.log(date);
    console.log("Delete " + date);
    const deleteNews = async()=>{
      try{
      const response = await axios.delete(`http://localhost:8082/user/delete/${date}`);
      console.log(response+" deleted");
      setNewsList(prevNewsList => prevNewsList.filter(news => news.date !== date));
      
      }
      catch(error){
        console.log(error);
        
      }
    }
    deleteNews();
    alert("News Deleted!!");
  };

  return (
    <div>
      <Navbar />
      <div className="create-news">
        <button onClick={handleClick}>Create News</button>
      </div>
      <div className="home-screen">
        <div className="table-data">
          <table>
            <thead>
              <tr>
                <th id="table-date">Date</th>
                <th id="table-heading">Headline</th>
                <th id="table-option">View</th>
                <th id="table-option">Edit</th>
                <th id="table-option">Delete</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news.id}>
                  <td>{news.date}</td>
                  <td id="news-heading">{news.heading}</td>
                  <td>
                    <img
                      onClick={() => handleView(news.date)} 
                      src="../../../images/view.png"
                      alt="View"
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => handleEdit(news.date)} 
                      src="../../../images/edit.png"
                      alt="Edit"
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => handleDelete(news.date)} 
                      src="../../../images/delete.png"
                      alt="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
