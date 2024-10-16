import React from 'react'
import Navbar from './Navbar';
import NewsTemplate from './NewsTemplate';
import '../css/CreateNews.css'

const CreateNews = () => {
  return (
    <div>
      <Navbar/>
      <div className="create-news-heading">
        <h3>Create a News</h3>
      </div>
        <NewsTemplate/>
    </div>
  )
}

export default CreateNews;
