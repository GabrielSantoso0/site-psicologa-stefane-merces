import { Composition } from "remotion";
import { SincroniaIntro } from "./SincroniaIntro";
import { ManifestoVideo } from "./Manifesto/ManifestoVideo";
import { VIDEO_METADATA } from "./Manifesto/SincroniaManifestoData";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SincroniaIntro"
        component={SincroniaIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ManifestoVideo"
        component={ManifestoVideo}
        durationInFrames={VIDEO_METADATA.totalDurationInFrames}
        fps={VIDEO_METADATA.fps}
        width={VIDEO_METADATA.width}
        height={VIDEO_METADATA.height}
      />
    </>
  );
};
