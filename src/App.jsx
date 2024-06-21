// src/App.jsx
import Visualizer from './Visualizer';
import ControlPanel from './ControlPanel';
import './App.css';
import  './index.css';

const App = () => {
  return (
    <div className="App">
      <h1>Algorithm Visualizer</h1>
      <ControlPanel />
      <Visualizer />
    </div>
  );
};

export default App;
