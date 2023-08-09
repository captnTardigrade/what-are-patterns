import {
  Circle,
  Img,
  Latex,
  Layout,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";
import { colorScheme, transitionDuration } from "../../color_scheme";
import {
  Direction,
  all,
  createRef,
  createRefArray,
  loopFor,
  range,
  slideTransition,
  useDuration,
  useRandom,
  waitFor,
} from "@motion-canvas/core";

import nn from "../../assets/network.svg";
import corpus from "../../assets/corpus.png";
import { Knob } from "../components/Knob";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const networkImgRef = createRef<Img>();
  view.add(
    <Img
      src={nn}
      ref={networkImgRef}
      position={[0, 0]}
      size={800}
      opacity={0}
    />
  );

  const corpusImgRef = createRef<Img>();
  view.add(
    <Img
      src={corpus}
      ref={corpusImgRef}
      position={[-600, -300]}
      size={300}
      opacity={0}
    />
  );

  const exDataPoint = createRef<Txt>();
  view.add(
    <Txt
      ref={exDataPoint}
      text={`The cat is sleeping
      The dog is dancing
      The bird is chirping 
      ...
      `}
      lineHeight={80}
      position={[-100, -300]}
      fill={colorScheme.text}
      fontSize={40}
      opacity={0}
      textAlign={"center"}
    />
  );

  const exInputVector = createRef<Latex>();
  view.add(
    <Latex
      ref={exInputVector}
      tex="{\color{white} \overrightarrow{w} = \begin{bmatrix} The \\ cat \\ is \end{bmatrix}}"
      height={300}
      width={300}
      position={[-200, 100]}
      opacity={0}
    />
  );

  const exOutputWord = createRef<Latex>();
  view.add(
    <Latex
      ref={exOutputWord}
      tex="{\color{white} sleeping}"
      height={250}
      width={250}
      position={[300, 100]}
      opacity={0}
    />
  );

  const exOutputVector = createRef<Latex>();
  view.add(
    <Layout ref={exOutputVector} opacity={0} position={[-80, 100]}>
      <Latex
        tex="{\color{white} \begin{bmatrix}   \vdots \\ 0 \\ \color{cyan} 1 \\ 0 \\ \vdots \end{bmatrix}}"
        height={400}
        width={400}
        position={[450, 0]}
      />
      <Latex
        tex="{\color{white} \begin{matrix}   \vdots \\ slept \\ \color{cyan} sleeping \\ slid \\ \vdots \end{matrix}}"
        height={400}
        width={400}
        position={[300, 0]}
      />
    </Layout>
  );

  // neural network

  const numKnobs = [3, 4, 2];

  const nnRef = createRef<Layout>();

  const inputTextRef = createRefArray<Txt>();

  const inputTextLayoutRef = createRef<Layout>();

  const knobsRef = createRefArray<Knob>();
  view.add(
    <Layout
      ref={nnRef}
      layout
      columnGap={125}
      alignItems={"center"}
      opacity={0}
      y={100}
    >
      <Layout
        ref={inputTextLayoutRef}
        direction={"column"}
        rowGap={75}
        layout={false}
        position={[-375, 0]}
      >
        {"The cat is".split(" ").map((word, i) => (
          <Txt
            text={word}
            ref={inputTextRef}
            fontSize={60}
            fill={colorScheme.text}
            position={[0, 150 * (i - 1)]}
          />
        ))}
      </Layout>

      <Layout direction={"column"} rowGap={75}>
        {...useRandom()
          .intArray(3, 100, 999)
          .map((word) => (
            <Txt
              text={`${word}`}
              ref={inputTextRef}
              fontSize={60}
              fill={colorScheme.text}
              opacity={0}
            />
          ))}
      </Layout>
      {...numKnobs.map((num) => {
        return (
          <Layout direction={"column"} rowGap={60}>
            {...range(num).map(() => {
              return (
                <Knob ref={knobsRef} size={100} colour={colorScheme.primary} />
              );
            })}
          </Layout>
        );
      })}
    </Layout>
  );

  const outputWordProb = createRef<Txt>();
  view.add(
    <Layout>
      <Latex
        tex="{\color{white} P_{sleeping}}"
        height={300}
        width={300}
        position={[700, 0]}
      />
      <Txt
        ref={outputWordProb}
        text={`${useRandom().nextFloat().toFixed(3)}`}
        fontSize={60}
        fill={"white"}
        position={[700, 150]}
      />
    </Layout>
  );

  yield* slideTransition(Direction.Right, transitionDuration);

  // yield* all(...knobsRef.map((knob) => knob.randomRotate(10)));

  yield* networkImgRef().opacity(1, 2);

  yield* waitFor(useDuration("end-neural-networks"));

  yield* networkImgRef().opacity(0, 2);

  yield* corpusImgRef().opacity(1, 2);

  // sample sentences
  yield* exDataPoint().opacity(1, 2);

  yield* exDataPoint().text("The cat is sleeping", 2);
  yield* all(exDataPoint().fontSize(60, 2), exDataPoint().x(0, 2));

  yield* exInputVector().opacity(1, 2);

  yield* exInputVector().position([-750, 0], 2);

  yield* exOutputWord().opacity(1, 2);

  yield* exOutputWord().opacity(0, 2);

  yield* exOutputVector().opacity(1, 2);

  yield* exOutputVector().position([-1050, 325], 2);

  yield* exOutputVector().scale(0.8, 2);

  // nn knobs
  yield* nnRef().opacity(1, 2);

  yield* all(
    ...knobsRef.map((knob) => knob.randomRotate(10)),
    loopFor(10, () =>
      outputWordProb().text(`${useRandom().nextFloat().toFixed(3)}`, 0.5)
    )
  );

  yield* all(
    knobsRef[0].randomRotate(10, knobsRef[0].rotation()),
    loopFor(10, () =>
      outputWordProb().text(`${useRandom().nextFloat().toFixed(3)}`, 1)
    )
  );

  yield* all(...inputTextRef.map((word) => word.fill(colorScheme.accent, 2)));

  yield* inputTextLayoutRef().position([-500, 0], 2);

  yield* all(...inputTextRef.splice(3, 6).map((word) => word.opacity(1, 2)));

  yield* waitFor(useDuration("first-sentence"));
});
