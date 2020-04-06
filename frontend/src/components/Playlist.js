import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState("noSongs");
  useEffect(() => {
    var parsed = queryString.parse(window.location.search);
    console.log(parsed);
    var accessToken = parsed.access_token;
    setPlaylist(props.location.playlistInfo);
    if (props.location.playlistInfo !== undefined) {
      const songData = props.location.playlistInfo.tracks.href;
      fetch(songData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setSongs(data.items);
        });
    }
  }, []);
  console.log(playlist);
  return (
    <div className="playlist">
      <div className="fontawesome">
        <FontAwesomeIcon
          className="goBack"
          icon={faArrowAltCircleLeft}
          size="4x"
          onClick={() => window.open(`/home${props.location.search}`, "_self")}
        />
      </div>

      {songs !== "noSongs" ? (
        <div className="playlisttop">
          <div>
            <h1> Welcome to: {playlist.name}</h1>
            <p>Created by: {playlist.owner.id}</p>
            <p>Total Songs: {playlist.tracks.total}</p>
            <a
              href={playlist.external_urls.spotify}
              className="playlistURL1"
              target="_blank"
            >
              Open In Spotify!
            </a>
          </div>
          <div className="noMargin">
            <img
              src={playlist.images[0].url}
              alt="4 top songs in the playlist"
            />
          </div>
        </div>
      ) : (
        <p>playlist unavailable</p>
      )}

      <div className="playlistheaders">
        <p className="playlistheader">Song Title</p>
        <p className="playlistheader">Song Artist</p>
        <p className="playlistheader1">Album</p>
      </div>
      {songs !== "noSongs" ? (
        <div className="playlistsongs">
          {songs.map((song) => (
            <div
              className="playlistsong"
              onClick={() =>
                window.open(song.track.external_urls.spotify, "_blank")
              }
            >
              <p className="song">{song.track.name}</p>
              <p className="artist">
                {song.track.artists.map((e) => e.name).join(", ")}
              </p>
              <p className="artist1">{song.track.album.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>
            You have no songs in this playlist or something went wrong, go back
            home and try again!
          </p>
          <Link to={{ pathname: "/home", search: props.location.search }}>
            Go Back Home!
          </Link>
        </div>
      )}
    </div>
  );
};

export default Playlist;
