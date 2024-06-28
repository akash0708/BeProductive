import {
  Brain,
  CalendarHeartIcon,
  LineChart,
  PenBox,
  ScanFace,
} from "lucide-react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import {
  Link,
  Outlet,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Todos from "./components/Todos";
import Summarizer from "./components/Summarizer";

function App() {
  const Layout = () => {
    return (
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
            <p className="font-poppins text-lg">
              <Link to="/summarizer">Summarizer</Link>
            </p>
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
        <div>
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
          element: <Todos />,
        },
        {
          path: "/summarizer",
          element: <Summarizer />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
