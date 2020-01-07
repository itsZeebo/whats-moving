import "./WatchComponent.scss";

import React from "react";
import CanvasVideoPlayer from "./CanvasVideoPlayer";

export default function WatchComponent() {
    return <div className="watch-component">
        <div className="video-display">
            <CanvasVideoPlayer videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" height={500} width={500} />
        </div>
        <div className="video-list">
            <div className="video-item"></div>
        </div>
    </div>;
}