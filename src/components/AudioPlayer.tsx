import React, { useState, useEffect } from "react";
import textToSpeech from "../app/utils/textToSpeech";
interface AudioPlayerProps {
  inputText: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ inputText }) => {
  // Define a state variable to hold the audio URL
  const [audioURL, setAudioURL] = useState<string | null>(null);

  // Define a function to fetch the audio data and set the URL state variable
  const handleAudioFetch = async () => {
    // Call the textToSpeech function to generate the audio data for the input text
    const data = await textToSpeech(inputText);
    // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
    const blob = await new Blob([data], { type: "audio/mpeg" });
    // Create a URL for the blob object
    const url = await URL.createObjectURL(blob);

    // Set the audio URL state variable to the newly created URL
    setAudioURL(url);
  };

  // Use the useEffect hook to call the handleAudioFetch function once when the component mounts
  useEffect(() => {
    handleAudioFetch();
  }, [inputText]); // Add inputText to the dependency array to re-run the effect when inputText changes

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
