import "./WatchComponent.scss";

import React from "react";
import CanvasVideoPlayer, { DrawableShape } from "./CanvasVideoPlayer";

const SHAPES: DrawableShape[] = [
    {
        path: [{ x: 10, y: 10 }, { x: 110, y: 10 }, { x: 110, y: 110 }, { x: 10, y: 110 }, { x: 10, y: 10 }],
        color: "#4cff40",
        frame: 15
    }, {
        path: [{ x: 15, y: 15 }, { x: 115, y: 15 }, { x: 115, y: 115 }, { x: 15, y: 115 }, { x: 15, y: 15 }],
        color: "#4cff40",
        frame: 16
    }, {
        path: [{ x: 20, y: 20 }, { x: 120, y: 20 }, { x: 120, y: 120 }, { x: 20, y: 120 }, { x: 20, y: 20 }],
        color: "#4cff40",
        frame: 17
    }, {
        path: [{ x: 25, y: 25 }, { x: 125, y: 25 }, { x: 125, y: 125 }, { x: 25, y: 125 }, { x: 25, y: 25 }],
        color: "#4cff40",
        frame: 18
    }, {
        path: [{ x: 30, y: 30 }, { x: 130, y: 30 }, { x: 130, y: 130 }, { x: 30, y: 130 }, { x: 30, y: 30 }],
        color: "#4cff40",
        frame: 19
    },
];

export default function WatchComponent() {
    return <div className="watch-component">
        <div className="video-display">
            <CanvasVideoPlayer videoSrc="https://www.w3schools.com/html/mov_bbb.mp4" shapes={SHAPES} height={500} width={500} />
        </div>
        <div className="video-list">
            <div className="video-item"></div>
        </div>
    </div>;
}