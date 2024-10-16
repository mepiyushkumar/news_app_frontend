import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateNews from './components/CreateNews';
import EditNews from './components/EditNews';
import ViewNews from './components/ViewNews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path='/create-news' element={<CreateNews/>}></Route>
        <Route path='/edit-news' element={<EditNews/>}></Route>
        <Route path='/view-news' element={<ViewNews/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
