import { useState } from "react";
import { Slider } from "@ui";

import "@shared/services/language";
import "@shared/services/theme";
import "@shared/styles/App.scss";
import { useSettingsStore } from "@shared/store";

export const App = () => {
  const store = useSettingsStore();
  const [volume, setVolume] = useState<string>(store.volume);
  const [volumeValid, setVolumeValid] = useState<boolean>(true);

  return (
    <div className="m-2">
      <Slider
        value={volume}
        setValue={setVolume}
        valid={volumeValid}
        setValid={setVolumeValid}
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
};
