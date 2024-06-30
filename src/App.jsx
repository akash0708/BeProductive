import {
  Brain,
  CalendarHeartIcon,
  LayoutPanelLeft,
  LineChart,
  PenBox,
  ScanFace,
} from "lucide-react";
import "./App.css";
// import Sidebar from "./components/Sidebar";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Todos from "./components/Todos";
import Summarizer from "./components/Summarizer";
import DashBoard from "./components/DashBoard";
import Rooms from "./components/Rooms";
import Videos from "./components/Videos";
import VideoPlayer from "./components/VideoPlayer";
import Chatbot from "./components/Chatbot"
import { useState } from "react";
// import Bal from "./components/Bal";

function App() {
  const Layout = () => {
    const [active, setActive] = useState('home')

    const handleItemClick = (item) => {
      setActive(item);
    };

    return (
      <div className="h-screen w-full flex gap-4 p-4 font-poppins">
        <div className="sidebar w-1/5 h-full flex flex-col gap-10 justify-center border-r-2 px-10 rounded-lg ">
        {/* <div>
          <img src="" alt="" />
        </div> */}
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'home' ? 'active' : ''}`} onClick={ () => handleItemClick('home') }>

            <LayoutPanelLeft size={24} />
            <p className="font-poppins text-lg">
              <Link to="/">Rooms</Link>
            </p>
          </div>
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'todos' ? 'active' : ''}`}onClick={ () => handleItemClick('todos') }>
            <CalendarHeartIcon size={24} />
            <p className="font-poppins text-lg">
              <Link to="/todos">Todos</Link>
            </p>
          </div>
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'summarizer' ? 'active' : ''}`} onClick={ () => handleItemClick('summarizer') }>
            <PenBox size={24} />
            <p className="font-poppins text-lg">
              <Link to="/summarizer">Summarizer</Link>
            </p>
          </div>
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'focusgpt' ? 'active' : ''}`} onClick={ () => handleItemClick('focusgpt') }>
            <Brain size={24} />
            <p className="font-poppins text-lg"><Link to="/focusgpt">Focus GPT</Link></p>
          </div>
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'deepfocus' ? 'active' : ''}`} onClick={ () => handleItemClick('deepfocus') }>
            <ScanFace size={24} />
            <p className="font-poppins text-lg">Deep Focus</p>
          </div>
          <div className={`flex gap-4 hover:bg-slate-400 hover:font-semibold rounded-xl hover:p-1 transition-all ${active === 'dashboard' ? 'active' : ''}`} onClick={ () => handleItemClick('dashboard') }>
            <LineChart size={24} />
            <p className="font-poppins text-lg">
              <Link to="/dashboard">Dashboard</Link>
            </p>
          </div>
        </div>
        <div className="w-4/5 h-full">
          <Outlet />
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Rooms />,
        },
        {
          path: "/todos",
          element: <Todos />,
        },
        {
          path: "/summarizer",
          element: <Summarizer />,
        },
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/focusgpt",
          element: <Chatbot />,
        },
        {
          path: "/room/:roomId",
          element: <Videos />,
        },
        {
          path: "/video/:videoId",
          element: <VideoPlayer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
