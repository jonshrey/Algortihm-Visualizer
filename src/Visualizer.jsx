import  { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { bubbleSort, selectionSort, insertionSort } from './SortingAlgorithms';
import './App.css';

const algorithms = {
  BubbleSort: bubbleSort,
  SelectionSort: selectionSort,
  InsertionSort: insertionSort
};

const Visualizer = () => {
  const [array, setArray] = useState(generateArray(10));
  const [speed, setSpeed] = useState(300);
  const [algorithm, setAlgorithm] = useState('BubbleSort');
  const [isSorting, setIsSorting] = useState(false);

  const [styles, api] = useSpring(() => ({
    from: { transform: 'scale(1)', backgroundColor: 'lightblue' }
  }));

  const startSorting = async () => {
    setIsSorting(true);
    const steps = algorithms[algorithm]([...array]);
    for (const step of steps) {
      setArray(step.array);
      api.start({
        transform: step.swap ? 'scale(1.2)' : 'scale(1)',
        backgroundColor: step.swap ? 'coral' : 'lightblue'
      });
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
    setIsSorting(false);
  };

  const generateNewArray = (size) => {
    if (isSorting) return;
    setArray(generateArray(size));
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="visualizer-container">
      <div className="controls">
        <button onClick={() => generateNewArray(array.length)}>New Array</button>
        <label>
          Speed:
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={handleSpeedChange}
            disabled={isSorting}
          />
        </label>
        <label>
          Algorithm:
          <select value={algorithm} onChange={handleAlgorithmChange} disabled={isSorting}>
            {Object.keys(algorithms).map((alg) => (
              <option key={alg} value={alg}>
                {alg}
              </option>
            ))}
          </select>
        </label>
        <button onClick={startSorting} disabled={isSorting}>
          Start {algorithm}
        </button>
      </div>
      <div className="visualizer">
        {array.map((value, index) => (
          <animated.div key={index} className="bar" style={{ ...styles, height: `${value * 20}px` }}>
            {value}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

const generateArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 20) + 1);
};

export default Visualizer;
