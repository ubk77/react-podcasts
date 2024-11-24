import { useEffect, useState } from "react";
import { fromUnixTime } from "date-fns";
import { ArrowFatLeft } from "@phosphor-icons/react";
import { PodcastIndexClient } from "podcastindexjs";

function EpisodesList({ podcast }) {
  const [episodes, setEpisodes] = useState(null);

  const client = new PodcastIndexClient(
    import.meta.env.VITE_API_AUTH_KEY,
    import.meta.env.VITE_API_SECRET_KEY
  );

  useEffect(() => {
    console.log("useEffect", client, podcast);
    client.episodesByFeedId(podcast.id).then((res) => {
      setEpisodes(res.items);
      console.log(res);
    });
  }, []);

  const onGotoPodcastsList = () => {
    console.log("onGotoPodcastsList");
    podcast = null;
  };

  return (
    <>
      <div className="flex items-center">
        <button
          className="border-2 rounded-lg p-1"
          onClick={onGotoPodcastsList}
        >
          <ArrowFatLeft
            size={32}
            color="#8b7437"
            weight="duotone"
          />
        </button>
        <div className="text-left">
          <h3>{podcast.title}</h3>
          <h5>{podcast.description}</h5>
        </div>
      </div>
      <div>
        {episodes &&
          episodes.map((episode) => (
            <div
              key={episode.id}
              className="border-2 mb-2 p-2 text-left"
            >
              <h4>
                {episode.title} <small>({episode.datePublishedPretty})</small>
              </h4>

              <audio controls>
                <source src={episode.enclosureUrl} />
              </audio>
            </div>
          ))}
      </div>
    </>
  );
}

export default EpisodesList;
