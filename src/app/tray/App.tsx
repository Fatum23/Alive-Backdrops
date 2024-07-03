import { useState } from "react";
import { Slider } from "@ui";

import "@shared/scripts/i18n";
import "@shared/scripts/theme";
import "@shared/styles/App.scss";

export const App = () => {
  const [volume, setVolume] = useState("");
  return (
    <div className="scale-90">
      <Slider value={volume} setValue={setVolume} min="0" max="100" step="1" />
    </div>
  );
};
