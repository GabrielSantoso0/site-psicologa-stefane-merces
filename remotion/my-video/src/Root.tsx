import "./index.css";
import { Composition } from "remotion";
import { Reelssincronia } from "./Reelssincronia";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelsSincronia"
        component={Reelssincronia}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};