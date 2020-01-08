import "./WatchComponent.scss";

import React from "react";
import CanvasVideoPlayer from "./CanvasVideoPlayer";
import { SERVER_SIDE } from "../general";

interface VideoItem {
    id: string,
    fileName: string,
    height: number,
    width: number
}

type ComponentState = {
    videoList?: VideoItem[]
    videoToPlay?: VideoItem
}

export default class WatchComponent extends React.PureComponent<{}, ComponentState> {
    state: ComponentState = {
        videoList: []
    }

    async componentDidMount() {
        const result = await fetch(SERVER_SIDE + "getAllVideos", {
            headers: new Headers({
                "content-type": "application/json"
            })
        });

        const list = await result.json();

        this.setState({ videoList: list });
    }

    render() {
        const { videoList, videoToPlay } = this.state;

        return <div className="watch-component">
            <div className="video-display">
                {videoToPlay && <CanvasVideoPlayer videoSrc={SERVER_SIDE + `playVideo/${videoToPlay.id}/${videoToPlay.fileName}`}
                    height={videoToPlay.height} width={videoToPlay.width} />}
            </div>
            <div className="video-list" >
                {videoList?.map(videoItem =>
                    <div key={videoItem.id} className="video-item" onClick={() => this._playVideo(videoItem)}>
                        {videoItem.fileName}
                    </div>)}
            </div>
        </div>;
    }

    private _playVideo = (videoItem: VideoItem) => { this.setState({ videoToPlay: videoItem }) };
}