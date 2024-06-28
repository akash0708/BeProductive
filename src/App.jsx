import './App.css'
import {
  Brain,
  CalendarHeartIcon,
  LineChart,
  PenBox,
  ScanFace,
} from "lucide-react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import DashBoard from './components/DashBoard';

function App() {
  return (
    <>
    <div className="h-screen w-full flex gap-4 p-4">
    <div className="sidebar w-1/5 h-full flex flex-col gap-10 justify-center border-r-2 px-14 rounded-lg">
      <div className="flex gap-4">
        <CalendarHeartIcon size={24} />
        <p className="font-poppins text-lg">
          <Link to="/">Todos</Link>
        </p>
      </div>
      <div className="flex gap-4">
        <PenBox size={24} />
        <p className="font-poppins text-lg">Summarizer</p>
      </div>
      <div className="flex gap-4">
        <Brain size={24} />
        <p className="font-poppins text-lg">Focus GPT</p>
      </div>
      <div className="flex gap-4">
        <ScanFace size={24} />
        <p className="font-poppins text-lg">Deep Focus</p>
      </div>
      <div className="flex gap-4">
        <LineChart size={24} />
        <p className="font-poppins text-lg">Dashboard</p>
      </div>
    </div>
    <div className="w-4/5 h-full rounded-lg">
      <DashBoard />
    </div>
  </div>
  </>
  )
}

export default App;
