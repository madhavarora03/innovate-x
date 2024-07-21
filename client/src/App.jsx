import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="mt-[10vh]">
        <Outlet />
      </main>
    </>
  );
};

export default App;
