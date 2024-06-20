import { useEffect, useState } from "react";
import { getCurrent } from "@tauri-apps/api/window";
import { Slider } from "@widgets";
import "@shared/styles/App.scss";

export default function App() {
  const [volume, setVolume] = useState("");
  useEffect(() => {
    getCurrent().onFocusChanged(({ payload: focused }) => {
      if (!focused) getCurrent().hide();
    });
  }, []);
  return (
    <div className="scale-90">
      <Slider value={volume} setValue={setVolume} min="0" max="100" step="1" />
    </div>
  );
}
