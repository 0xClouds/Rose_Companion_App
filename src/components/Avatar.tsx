"use client";
import axios from "axios";
import { useEffect, useState } from "react";
const DID_API_KEY = process.env.NEXT_PUBLIC_DID_API_KEY;

type AvatarProps = {
  inputText: string;
};

export default function Avatar({ inputText }: AvatarProps) {
  const [videoId, setVideoId] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>("");

  const data = {
    source_url: "https://clips-presenters.d-id.com/amy/image.png",
    script: {
      type: "text",
      input: `${inputText}`,
      provider: {
        type: "elevenlabs",
        voice_id: "EXAVITQu4vr4xnSDxMaL",
      },
    },
  };

  const postData = async () => {
    await axios
      .post("https://api.d-id.com/talks", data, {
        headers: {
          Authorization: `Basic ${DID_API_KEY}`,
          accept: "application/json",
        },
      })
      .then((response) => {
        setVideoId(response.data.id);
      })
      .then(() => {
        console.log(videoId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getVideo = async () => {
    let result = null;
    while (!result || result.pending_url) {
      try {
        const response = await axios.get(
          `https://api.d-id.com/talks/${videoId}`,
          {
            headers: {
              Authorization: `Basic ${DID_API_KEY}`,
              accept: "application/json",
            },
          }
        );

        result = response.data;

        if (result.pending_url) {
          console.log("Video still pending. Waiting...");
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before the next poll
        } else if (result.result_url) {
          console.log("Video ready.");
          setVideoUrl(result.result_url);
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }
  };

  useEffect(() => {}, [videoUrl]);

  useEffect(() => {
    if (inputText === "") return;
    postData();
  }, [inputText]);

  useEffect(() => {
    if (videoId) {
      getVideo();
    }
  }, [videoId]);

  //Console log some ish
  useEffect(() => {
    console.log(videoId);
  }, [videoId]);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <div>
      {videoUrl && (
        <div className="rounded-full overflow-hidden flex justify-center items-center">
          <video
            className="rounded-full"
            key={videoUrl}
            width="320"
            height="240"
            autoPlay
          >
            <source src={videoUrl} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
