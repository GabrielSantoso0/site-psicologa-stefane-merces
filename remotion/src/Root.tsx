import { Composition } from "remotion";
import { SincroniaIntro } from "./SincroniaIntro";

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
    </>
  );
};
