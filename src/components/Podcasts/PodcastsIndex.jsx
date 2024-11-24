import { useState } from "react";
import "./EpisodesList";
import EpisodesList from "./EpisodesList";
import { useApi } from "../../assets/hooks/useApi";
import { PodcastIndexClient } from "podcastindexjs";

function PodcastsIndex() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPodcast, setCurrentPodcast] = useState(null);
  /* const { data, isLoading, error, fetchData } = useApi(
    "/search/byterm?q=" + searchText
  ); */

  /* const { data, isLoading, error, fetchData } = useApi(
    "/search/byTerm?q=" + searchText
  ); */

  function getPodcasts() {
    setCurrentPodcast(null);

    //fetchData();

    const client = new PodcastIndexClient(
      import.meta.env.VITE_API_AUTH_KEY,
      import.meta.env.VITE_API_SECRET_KEY
    );

    client.search(searchText).then((res) => setPodcasts(res.feeds));
  }

  function onSubmit(e) {
    e.preventDefault();
    getPodcasts();
  }

  const onSetCurrentPodcast = (podcast) => {
    setCurrentPodcast(podcast);
  };

  const handleResetForm = () => {
    setPodcasts([]);
    setCurrentPodcast(null);
    setSearchText("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search for podcasts"
            className="border mb-2 p-2 rounded rounded-2 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            onClick={handleResetForm}
          >
            X
          </button>
        </div>
      </form>

      {!currentPodcast &&
        podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="flex items-center rounded border mb-2 p-2 hover:bg-sky-700"
            onClick={() => setCurrentPodcast(podcast)}
          >
            <div>
              <img
                src={podcast.image}
                style={{ width: "80px" }}
                className="border-1"
              />
            </div>
            <div>
              <h3 className="font-lg">{podcast.title}</h3>
            </div>
          </div>
        ))}

      {currentPodcast && <EpisodesList podcast={currentPodcast} />}
    </>
  );
}

export default PodcastsIndex;
