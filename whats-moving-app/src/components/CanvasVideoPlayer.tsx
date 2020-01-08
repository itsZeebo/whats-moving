import "./CanvasVideoPlayer.scss";

import React from "react";
import { SERVER_SIDE } from "../general";

export interface DetectionBounds {
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface Detection {
    bbox: DetectionBounds;
    class: string;
    score: number;
}

export interface FrameShapesData {
    frame: string;
    predictions: Detection[];
}

interface Props {
    height: number;
    width: number;
    videoSrc: string;
    videoId: string;
    onVideoPlay?: () => void;
    onVideoPause?: () => void;
    onVideoEnd?: () => void;
}

interface DetectionsDictionary {
    [frame: string]: Detection[]
}

const PLAYER_FPS = 15;
let SHAPES_TO_DRAW: DetectionsDictionary = {};
let currentFrame = 0;

export default class CanvasVideoPlayer extends React.Component<Props> {
    _videoRef: HTMLVideoElement | null = null;
    _canvasRef: HTMLCanvasElement | null = null;

    async componentWillMount() {
        const result: FrameShapesData[] = await this._getVideoFrames(this.props.videoId);

        result.map(data => SHAPES_TO_DRAW[data.frame] = data.predictions);
    }

    componentDidMount() {
        const ctx = this._canvasRef?.getContext("2d");

        if (ctx) {
            ctx.strokeStyle = "#00ff00";
            ctx.font = "20px Arial";
            ctx.fillStyle = "#00ff00";
        }
    }

    render() {
        const { videoSrc, height, width } = this.props;

        return <div className="video-player-container">
            <video hidden ref={this._setVideoRef}
                onPlay={this._handleVideoPlay}
                onPause={this._handleVideoPause}
                onEnded={this._handleVideoEnd}>
                <source src={videoSrc} type="video/mp4" />
            </video>
            <canvas className="video-preview" ref={this._setaCanvasRef} height={height} width={width}></canvas>
            <div className="player-action-bar"></div>
            <button onClick={() => this._videoRef?.play()}>play</button>
            <button onClick={() => this._videoRef?.pause()}>pause</button>
        </div>;
    }

    _setVideoRef = (videoElement: HTMLVideoElement) => this._videoRef = videoElement;
    _setaCanvasRef = (canvasElement: HTMLCanvasElement) => this._canvasRef = canvasElement;

    _renderFrameToCanvas = () => {
        const ctx = this._canvasRef?.getContext("2d");
        currentFrame++;

        if (ctx && this._videoRef && !this._videoRef.paused && !this._videoRef.ended) {
            ctx.drawImage(this._videoRef, 0, 0);
            const drawable = SHAPES_TO_DRAW[(currentFrame + 21).toString()]
            drawable && drawable.map(pred => this._drawShapeToCanvas(pred, ctx));
            setTimeout(this._renderFrameToCanvas, 1000 / PLAYER_FPS);
        }
    }

    _handleVideoPlay = () => {
        const { onVideoPlay } = this.props;

        this._renderFrameToCanvas();

        onVideoPlay && onVideoPlay();
        console.log("video is playing.")
    }

    _handleVideoPause = () => {
        const { onVideoPause } = this.props;

        onVideoPause && onVideoPause();
        console.log("video paused.")
    }

    _handleVideoEnd = () => {
        const { onVideoEnd } = this.props;

        currentFrame = 0;
        onVideoEnd && onVideoEnd();
        console.log("video ended.");
    }

    _drawShapeToCanvas = (shape: Detection, canvasRef: any) => {
        const { bbox } = shape;
        const { x, y, height, width } = bbox;

        if (canvasRef) {
            canvasRef.strokeRect(x, y, width, height);
            canvasRef.fillText(`${shape.class} : ${shape.score}`, x, y - 25);
        }
    }

    private async _getVideoFrames(videoId: string): Promise<FrameShapesData[]> {
        const result = await fetch(SERVER_SIDE + `GetFrames/${videoId}`, {
            headers: new Headers({
                "content-type": "application/json"
            })
        });

        const parsedResult = await result.json();

        return parsedResult && parsedResult.frames;
    }
}