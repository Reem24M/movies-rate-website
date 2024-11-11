import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import NavBar from './compontents/navbar';
import NotFound from './pages/notfound';
import Rated from './pages/rated';
import Movies from './pages/movies';
import TVshows from './pages/TVshows';


function App() {



  return (
    <div>
      <Router>
        <div className="bg-slate-900 mt-0">
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rated" element={<Rated />} />
          <Route path="/movies/:id" element={<Movies />} />
          <Route path="/TVshows/:id" element={<TVshows />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
