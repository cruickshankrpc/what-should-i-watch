import './App.css';
import cursor from './cursor.png';
import Footer from './Footer';

function App() {
  return (
    <div className="App">

      <div className="home_box">
        <p className="home_text">What the f*** should I watch ?</p>
      </div>
      <div ></div>
      <img className="cursor_img" src={cursor} alt="cursor" />
      {/* <div component={Footer}></div> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
