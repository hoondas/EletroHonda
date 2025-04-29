import './App.css'; 
import Navbar from './components/Navbar';
import Crud from './components/Crud';

function App() {
  return (
    <div className="mobile-container">
      <Navbar />
      <Crud />
    </div>
  );
}

export default App;