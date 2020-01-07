import "./CanvasVideoPlayer.scss";

import React from "react";

export type Point = {
    x: number;
    y: number;
}

export interface DrawableShape {
    path: Point[];
    color: string;
    frame: number;
}

interface Props {
    videoSrc: string;
    height: number;
    width: number;
    shapes?: DrawableShape[];
    onVideoPlay?: () => void;
    onVideoPause?: () => void;
    onVideoEnd?: () => void;
}

const PLAYER_FPS = 15;
let SHAPES_TO_DRAW: DrawableShape[] = [];
let currentFrame = 0;

export default class CanvasVideoPlayer extends React.Component<Props> {
    _videoRef: HTMLVideoElement | null = null;
    _canvasRef: HTMLCanvasElement | null = null;

    componentDidMount() {
        if (this.props.shapes) SHAPES_TO_DRAW = this.props.shapes;
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

        if (this._videoRef && !this._videoRef.paused && !this._videoRef.ended) {
            ctx?.drawImage(this._videoRef, 0, 0);
            SHAPES_TO_DRAW.filter(shape => shape.frame === currentFrame).map(this._drawPathToCanvas);
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


    _convertTimeToFrame(timestamp: number): number {
        return (timestamp - (timestamp % PLAYER_FPS)) / PLAYER_FPS;
    }

    _drawPathToCanvas = (shape: DrawableShape) => {
        const { path, color } = shape;
        const ctx = this._canvasRef?.getContext("2d");

        if (ctx) {
            ctx.strokeStyle = color;
            ctx.beginPath();

            for (let i = 0; i < path.length; i++) {
                if (i === 0) ctx.moveTo(path[i].x, path[0].y);
                else ctx.lineTo(path[i].x, path[i].y);
            }

            ctx.stroke();
            ctx.closePath();
        }
    }
}