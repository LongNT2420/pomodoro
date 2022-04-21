import "./App.css";
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import Layout from "./components/Layout";
import Todo from "./components/Todo";
import { useGolobalContext } from "./context";
function App() {
  const { layout } = useGolobalContext();
  return (
    <div className="App">
      {layout && <Layout />}
      <Navbar />
      <Timer />
      <Todo />
    </div>
  );
}

export default App;
