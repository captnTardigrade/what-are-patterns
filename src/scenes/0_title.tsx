import { Img, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import { createRef, waitFor } from "@motion-canvas/core";

import peacock from "../../assets/peacock.svg";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const imgRef = createRef<Img>();
  view.add(
    <Img
      src={peacock}
      ref={imgRef}
      opacity={0}
      scale={0.5}
      position={[648, 251]}
    />
  );

  yield* imgRef().opacity(0.15, 2);

  const titleRef = createRef<Txt>();
  view.add(<Txt ref={titleRef} fill={colorScheme.text} />);

  yield* titleRef().text("...but what is a pattern?", 4);

  yield* waitFor(3);
});
