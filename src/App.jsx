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
import L1 from "./components/L1";
import L2 from "./components/L2";
import L3 from "./components/L3";

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
        <div className="w-4/5 h-full flex flex-col gap-10 justify-center px-14 rounded-lg">
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
        {
          path: "L1/:L1",
          element: <L1 />,
          children: [
            {
              path: "L2/:L2",
              element: <L2 />,
            },
            {
              path: "L2/:L2/L3/:L3",
              element: <L3 />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
