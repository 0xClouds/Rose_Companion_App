import React, { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AppState } from './QAModal';
import "./AudioRecorder.css";

export interface AudioRecorderProps {
    // appState: AppState,
    setDialog: Dispatch<SetStateAction<string>>,
    formReference: MutableRefObject<HTMLFormElement | undefined> 
}

// function AudioRecorderTemp({appState, setDialog, formReference}: AudioRecorderProps) {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) 
//     return <span>Browser doesn't support speech recognition.</span>;
//   

//   const submit = () => {
//     setDialog(transcript);
//     // if (formReference.current)  
//     //   formReference.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

//     SpeechRecognition.stopListening();
//     resetTranscript();
//   };

//   useEffect(async () => {
//     await SpeechRecognition.startListening();
//   }, []); 

//   return (
//     <div className="container">
//       { listening ?  
//           <span className="microphone-on" /> :
//           <span className="microphone-off" /> 
//       }
//       <button className="button" onClick={submit}>Submit</button>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };


import { useWhisper } from '@chengsokdara/use-whisper'

function AudioRecorder({setDialog, formReference}: AudioRecorderProps) {
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

    transcript = { 
      blob: undefined,
      text: undefined 
    };
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

export default AudioRecorder;
