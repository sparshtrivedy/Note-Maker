import logo from './logo.svg';
import './App.css';
import StudyNotes from './components/StudyNotes';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation />
      <StudyNotes />
      <ul>
      </ul>
    </div>
  );
}

export default App;
