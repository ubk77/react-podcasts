import { useState } from "react";
import "./App.css";
import "./components/Podcasts/PodcastsIndex";
import PodcastsIndex from "./components/Podcasts/PodcastsIndex";
import { Microphone } from "@phosphor-icons/react";

function App() {
  console.log(import.meta.env);
  return (
    <>
      <div className="flex items-center">
        <Microphone
          size={32}
          color="#8b7437"
          weight="duotone"
          onClick={() => (window.location = "/")}
        />
        <h1>Podcasts</h1>
      </div>

      <PodcastsIndex />
    </>
  );
}

export default App;
