import ReactPlayer from "react-player"
type ChilProps = {
    videoUrl : string
}

export default function  ReactPlayerVideo({videoUrl} : ChilProps) {

    return (
        <div className="player-wrapper rounded-4xl">
        <ReactPlayer
            url={videoUrl}
            className={"react-player "}
            controls
            width={"100%"}
            height={"100%"}
        />
        </div>
    )
}