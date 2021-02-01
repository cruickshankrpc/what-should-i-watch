import './App.css';
import cursor from './cursor.png'
function App() {
  return (
    <div className="App">
      <div className="home_box">
        <p className="home_text">What the f*** should I watch ?</p>
      </div>
      <div ></div>
      <img className="cursor_img" src={cursor} alt="cursor" />
    </div>
  );
}

export default App;
