import { useState } from "react";
import { Slider } from "@ui";

import "@shared/services/language";
import "@shared/services/theme";
import "@shared/styles/App.scss";
import { useSettingsStore } from "@shared/store";

export const App = () => {
  const [volume, setVolume] = useState("");
  useSettingsStore();
  return (
    <div className="scale-90">
      <Slider value={volume} setValue={setVolume} min="0" max="100" step="1" />
    </div>
  );
};
