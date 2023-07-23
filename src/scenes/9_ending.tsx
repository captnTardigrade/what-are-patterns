import { Img, Layout, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";

import chatGpt from "../../assets/chat_gpt.svg";
import {
  Direction,
  all,
  createRef,
  slideTransition,
} from "@motion-canvas/core";

const textStyle = {
  fill: colorScheme.text,
};

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const imgRef = createRef<Img>();
  view.add(<Img ref={imgRef} src={chatGpt} size={400} opacity={0} />);

  const ackRef = createRef<Txt>();
  view.add(
    <Txt
      ref={ackRef}
      text={"Acknowlegements"}
      y={-400}
      {...textStyle}
      fontSize={75}
      opacity={0}
    />
  );

  const layoutRef = createRef<Layout>();
  view.add(
    <Layout layout direction={"column"} rowGap={40} opacity={0} ref={layoutRef}>
      {/* bengio et al. */}
      <Txt
        text={"1. A Neural Probabalistic Language Model, Bengio et al. 2003"}
        {...textStyle}
      />
      <Txt
        text="https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf"
        {...textStyle}
        fontStyle={"italic"}
      />
      {/* Artificial Neural Networks by Prof. Yegnanarayana */}
      <Txt
        text={"2. Artificial Neural Networks by Prof. Yegnanarayana"}
        {...textStyle}
      />
    </Layout>
  );

  yield* slideTransition(Direction.Left);

  yield* imgRef().opacity(1, 2);
  yield* imgRef().opacity(0, 2);

  yield* all(ackRef().opacity(1, 1), layoutRef().opacity(1, 1));
});
