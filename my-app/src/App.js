import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import './App.css';
import DateTask from './pages/DateTask';
import Timesheet from './pages/Timesheet';
import Logicaltask from './pages/Logicaltask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DateTask />} />
        <Route path='/timesheet' element={<Timesheet />} />
        <Route path='/logicaltask' element={<Logicaltask />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
