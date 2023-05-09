import {BrowserRouter ,Routes ,Route} from 'react-router-dom';
import './App.css';
import DateTask from './pages/DateTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DateTask />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
