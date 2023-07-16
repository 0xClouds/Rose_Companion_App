import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useWhisper } from '@chengsokdara/use-whisper'
import "./AudioRecorder.css";

export interface AudioRecorderProps {
    setDialog: Dispatch<SetStateAction<string>>,
    formReference: MutableRefObject<HTMLFormElement | undefined> 
}

export default function AudioRecorder({setDialog, formReference}: AudioRecorderProps) {
  let {
    recording,
    speaking,
    transcript,
    transcribing,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // YOUR_OPEN_AI_TOKEN
    autoStart: true,
    streaming: true
  });

  function submit() {
    stopRecording();

    if(transcript.text)
        setDialog(transcript.text);
    if (formReference.current)  
      formReference.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

    // transcript = { 
    //   blob: undefined,
    //   text: undefined 
    // };
  };

  return (
    <div className="container">
      { recording ?  
          <span className="microphone-on" /> :
          <span className="microphone-off" /> 
      }
      <button className="button" onClick={submit}>Submit</button>
      <button className="button" onClick={startRecording}>Record</button>
    </div>
  );
}
