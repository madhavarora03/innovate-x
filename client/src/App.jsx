import { MoonIcon, SunIcon } from "lucide-react";
import { switchTheme } from "./utils/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const theme = useSelector((state) => state.themeReducer.value);
  const dispatch = useDispatch();
  return (
    <h1 className="text-slate-700">
      <div>Hello!</div>
      <button className="btn btn-primary">Button</button>
      <div className="flex gap-2">
        <SunIcon />
        <input
          type="checkbox"
          className="toggle"
          checked={theme === "dim"}
          onClick={() => dispatch(switchTheme())}
        />
        <MoonIcon />
      </div>
    </h1>
  );
}

export default App;
