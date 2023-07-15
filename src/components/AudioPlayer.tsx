import React, { useState, useEffect, useCallback } from "react";
import textToSpeech from "../app/utils/textToSpeech";
import { debounce } from "lodash";
interface AudioPlayerProps {
  inputText: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ inputText }) => {
  // Define a state variable to hold the audio URL
  const [audioURL, setAudioURL] = useState<string | null>(null);

  /*
  // Define a function to fetch the audio data and set the URL state variable
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAudioFetch = async () => {
    // Call the textToSpeech function to generate the audio data for the input text
    const data = await textToSpeech(inputText);
    // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
    const blob = new Blob([data], { type: "audio/mpeg" });
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
    // Set the audio URL state variable to the newly created URL
    setAudioURL(url);
  };
  // Use the useEffect hook to call the handleAudioFetch function once when the component mounts
  useEffect(() => {
    handleAudioFetch();
  }, [handleAudioFetch, inputText]); // Add inputText to the dependency array to re-run the effect when inputText changes
*/

  const handleAudioFetch = useCallback(
    debounce(async () => {
      if (inputText === "") {
        return;
      }
      setAudioURL(null);
      // Call the textToSpeech function to generate the audio data for the input text
      const data = await textToSpeech(inputText);
      // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
      const blob = new Blob([data], { type: "audio/mpeg" });
      // Create a URL for the blob object
      console.log("Im in here");
      // if (audioURL) {
      //   console.log("Im revoking");
      //   URL.revokeObjectURL(audioURL);
      // }
      const url = URL.createObjectURL(blob);

      // Set the audio URL state variable to the newly created URL
      console.log(url);
      setAudioURL(url);
    }, 500),
    [inputText]
  ); // inputText is a dependency of handleAudioFetch

  useEffect(() => {
    handleAudioFetch();
  }, [handleAudioFetch]); // handleAudioFetch is a dependency of the effect

  // Render an audio element with the URL if it is not null
  return (
    <div>
      {audioURL && (
        <audio autoPlay controls>
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default AudioPlayer;
