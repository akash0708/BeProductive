import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="h-screen w-full flex gap-4 p-4">
      <div className="sidebar w-1/4 h-full flex flex-col gap-4 items-center justify-center bg-green-500">
        <div>Todos</div>
        <div>Summarizer</div>
        <div>GPT</div>
        <div>Deep Focus</div>
        <div>Dashboard</div>
      </div>
      <div className="main w-3/4 h-full bg-green-500">Main</div>
    </div>
  );
}

export default App;
