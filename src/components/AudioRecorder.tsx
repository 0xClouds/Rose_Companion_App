import React, { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AppState } from './QAModal';
import "./AudioRecorder.css";

export interface AudioRecorderProps {
    appState: AppState,
    setDialog: Dispatch<SetStateAction<string>>,
    formReference: MutableRefObject<HTMLFormElement> 
}

export default function AudioRecorder({appState, setDialog, formReference}: AudioRecorderProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const submit = () => {
    setDialog(transcript);
    formReference.current && formReference.current.submit();

    SpeechRecognition.stopListening();
    resetTranscript();
  };

  useEffect(() => {
    SpeechRecognition.startListening();
  }, []); 

  return (
    <div>
      <div className="microphone" >
        <span className={ listening ? "on" : "off" } />
      </div>
      { 
        listening ?  
          <span className="microphone-on" /> :
          <span className="microphone-off" /> 
      }
      <button onClick={submit}>Submit</button>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <p>{transcript}</p>
    </div>
  );
};
