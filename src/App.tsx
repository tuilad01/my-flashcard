import './App.css';

import { Button } from 'react-bootstrap';
import DataTable from './components/data-table/data-table';
import FormGroup from './components/form-group/form-group';
import { Routes, Route } from 'react-router-dom';
// pages
import HomePage from './pages/home';
import GroupPage from './pages/group';

import Data from './mockData';

function App() {

  return (
    //<div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="group/:groupId" element={<GroupPage />} />
        <Route path="group/add" element={<GroupPage />} />
      </Routes>      
    //</div>
  );
}

export default App;
