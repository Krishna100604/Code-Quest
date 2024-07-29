import { fetchallusers } from "./action/users";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Comnponent/Navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Allroutes from "./Allroutes";
import { useDispatch } from "react-redux";
import { fetchallquestion } from "./action/question";
import ChatBot from "./Comnponent/ChatBot/ChatBot";

function App() {
  const [slidein, setslidein] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchallusers());
    dispatch(fetchallquestion());
  }, [dispatch]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setslidein(false);
    }
  }, []);
  const handleslidein = () => {
    if (window.innerWidth <= 768) {
      setslidein((state) => !state);
    }
  };

  return (
    <div className="App">
      {/* <MainForm /> */}
      <Router>
        <Navbar handleslidein={handleslidein} />
        <Allroutes slidein={slidein} handleslidein={handleslidein} />
      </Router>

      <ChatBot />
    </div>
  );
}

export default App;
