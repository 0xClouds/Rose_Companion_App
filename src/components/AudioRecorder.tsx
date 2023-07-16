import React, { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AppState } from './QAModal';
import "./AudioRecorder.css";

export interface AudioRecorderProps {
    appState: AppState,
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

function AudioRecorder({appState, setDialog, formReference}: AudioRecorderProps) {
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
  });

  function submit() {
    if(transcript.text)
        setDialog(transcript.text);

    if (formReference.current)  
      formReference.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

    stopRecording();
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
      <button onClick={startRecording}>Start</button>
      <p>{transcript.text}</p>
    </div>
  );


  // return (
  //   <div>
  //     <p>Recording: {recording ? "true" : "false" }</p>
  //     <p>Speaking: {speaking ? "true" : "false" }</p>
  //     <p>Transcribing: { transcribing ? "true" : "false" }</p>
  //     <p>Transcribed Text: { transcript ? transcript.text : "" }</p>
  //     <button onClick={startRecording}>Start</button>
  //     <button onClick={pauseRecording}>Pause</button>
  //     <button onClick={stopRecording}>Stop</button>
  //   </div>
  // );
}

export default AudioRecorder;
