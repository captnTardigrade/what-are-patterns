import { Img, Layout, Line, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";

import chatGpt from "../../assets/chat_gpt.svg";
import {
  Direction,
  all,
  createRef,
  slideTransition,
  useDuration,
  waitFor,
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

  yield* waitFor(useDuration("show-gpt"));

  yield* imgRef().opacity(1, 2);

  yield* all(imgRef().scale(0.5, 2), imgRef().position([-200, 0], 2));

  const inputTextRef = createRef<Txt>();
  view.add(
    <Txt
      text={"The dog is"}
      ref={inputTextRef}
      position={imgRef().top().addY(-300)}
      fill={colorScheme.text}
      opacity={0}
      textAlign={"center"}
    />
  );

  const inputLineRef = createRef<Line>();
  view.add(
    <Line
      points={[inputTextRef().middle().addY(30), imgRef().top().addY(-10)]}
      stroke={colorScheme.text}
      lineWidth={5}
      endArrow
      ref={inputLineRef}
    />
  );

  const outputTextRef = createRef<Txt>();
  view.add(
    <Txt
      text={"dancing"}
      ref={outputTextRef}
      position={imgRef().right().addX(400)}
      fill={colorScheme.text}
      opacity={0}
    />
  );

  const outputLineRef = createRef<Line>();
  view.add(
    <Line
      points={[imgRef().right().addX(10), outputTextRef().left().addX(-60)]}
      stroke={colorScheme.text}
      lineWidth={5}
      endArrow
      ref={outputLineRef}
    />
  );

  yield inputLineRef().end(0);
  yield outputLineRef().end(0);

  yield* inputTextRef().opacity(1, 1);

  yield* inputLineRef().end(1, 1);

  yield* waitFor(useDuration("gpt-input"));

  yield* outputLineRef().end(1, 1);

  yield* outputTextRef().opacity(1, 1);

  yield* waitFor(useDuration("gpt-output"));

  yield* inputTextRef().text("The dog is dancing", 1);

  yield* outputTextRef().text("because", 1);

  yield* inputTextRef().text("The dog is dancing because", 1);

  yield* outputTextRef().text("it", 1);

  yield* inputTextRef().text("The dog is dancing because it", 1);

  yield* outputTextRef().text("was", 1);

  yield* inputTextRef().text("The dog is dancing because it was", 1);

  yield* outputTextRef().text("raining", 1);

  // yield* waitFor(useDuration("end-gpt-output"))

  const clearDuration = useDuration("clear-gpt");

  yield* all(
    inputLineRef().opacity(0, clearDuration),
    outputLineRef().opacity(0, clearDuration),
    inputTextRef().opacity(0, clearDuration),
    outputTextRef().opacity(0, clearDuration),
    imgRef().opacity(0, clearDuration)
  );

  yield* waitFor(useDuration("ack"));


  
  yield* all(ackRef().opacity(1, 1), layoutRef().opacity(1, 1));
  
  yield* waitFor(useDuration("end"));
});
