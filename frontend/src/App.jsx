import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./Component/Langind"
import Footer from "./Component/Footer"
import Signup from './Component/Signup';
import Topbar from "./Component/Topbar"
import Folder from './Component/Folder';
import AddFolder from './Component/AddFolder';
import AddFiles from './Component/AddFiles';
function App() {
  return (
    <Router>
      <div className=" max-w-screen-2xl mx-auto">
        <Topbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/addimage/:id" element={<AddFiles />} />
          <Route path="/addfolder" element={<AddFolder />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/folder/:id" element={<Folder />} /> {/* Define route with parameter */}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
