import React from "react";

function ExerciseVideos({ vids, name }) {
  if (!vids.length)
    return (
      <div className="flex justify-center items-center min-h-16">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="mt-10 mx-6">
      <p className="font-bold text-lg my-9">
        Watch <span className="text-primary">{name}</span> exercise videos
      </p>
      <div className="flex justify-evenly flex-wrap">
        {vids?.slice(0, 3)?.map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              style={{ borderTopLeftRadius: "20px" }}
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
            />
            <div>
              <p className="font-semibold max-w-sm">{item.video.title}</p>
              <p className="max-w-md">{item.video.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ExerciseVideos;
