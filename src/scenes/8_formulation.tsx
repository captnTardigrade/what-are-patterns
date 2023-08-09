import {
  Circle,
  Grid,
  Latex,
  Layout,
  Line,
  Rect,
  Txt,
} from "@motion-canvas/2d/lib/components";
import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import {
  all,
  chain,
  loop,
  loopUntil,
  waitFor,
} from "@motion-canvas/core/lib/flow";
import {
  createRef,
  range,
  useDuration,
  useRandom,
} from "@motion-canvas/core/lib/utils";
import { colorScheme } from "../../color_scheme";
import { Table } from "../components/Table";
import {
  Direction,
  ThreadGenerator,
  createSignal,
  join,
  slideTransition,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const random = useRandom(1337);

  const genRandomNumbers = () => {
    return random
      .floatArray(10)
      .map((val) => val.toFixed(4))
      .concat(["...", "..."]);
  };

  const embeddings = createSignal<string[]>(genRandomNumbers());

  const inputVectorRef = createRef<Latex>();
  view.add(
    <Latex
      ref={inputVectorRef}
      tex="{\color{white} \overrightarrow{w} = \begin{bmatrix} The \\ dog \\ is \end{bmatrix}}"
      height={400}
      width={400}
    />
  );

  const functionRef = createRef<Latex>();
  view.add(
    <Latex
      ref={functionRef}
      tex="{\color{white} f(\overrightarrow{w}) \rightarrow P}"
      width={500}
      height={200}
    />
  );

  const mappingVectorRef = createRef<Latex>();
  view.add(
    <Latex
      ref={mappingVectorRef}
      tex="{\color{white} \overrightarrow{w}_{mapped} = \begin{bmatrix} 1337 \\ 4242 \\ 100  \end{bmatrix}}"
      height={400}
      width={600}
      y={-300}
      x={400}
    />
  );

  const functionMappedRef = createRef<Latex>();
  view.add(
    <Latex
      ref={functionMappedRef}
      tex="{\color{white} f(\overrightarrow{w}_{mapped}) \rightarrow 4875 \rightarrow dancing}"
      width={900}
      height={400}
      x={400}
    />
  );

  const embeddingTableRef = createRef<Table>();
  view.add(
    <Table
      ref={embeddingTableRef}
      data={embeddings}
      width={1000}
      stroke={colorScheme[600]}
      nCols={2}
      position={[-300, 200]}
      scale={0.75}
    />
  );

  const labelRef = createRef<Table>();
  view.add(
    <Table
      ref={labelRef}
      data={"The dog cat is wearing ...".split(" ")}
      width={200}
      stroke={colorScheme.background}
      nCols={1}
      zIndex={-1}
      scale={0.75}
    />
  );

  const embedInputVectorRef = createRef<Latex>();
  view.add(
    <Latex
      ref={embedInputVectorRef}
      tex={() =>
        String.raw`{\color{white} \overrightarrow{w}_{emb} = \begin{bmatrix} ${
          embeddings()[0]
        } & ${embeddings()[1]} \\ ${embeddings()[2]} & ${embeddings()[3]} \\ ${
          embeddings()[6]
        } & ${embeddings()[7]}   \end{bmatrix}}`
      }
      width={600}
      position={() => inputVectorRef().right().addX(350)}
    />
  );

  const functionEmbeddedRef = createRef<Latex>();
  view.add(
    <Latex
      ref={functionEmbeddedRef}
      tex="{\color{white} f(\overrightarrow{w}_{emb}) \rightarrow P}"
      position={() => functionRef().right().addX(350)}
      width={500}
    />
  );

  const nnRef = createRef<Rect>();
  const nnInputRef = createRef<Latex>();

  const inputLine = createRef<Line>();
  const outputLine = createRef<Line>();
  const backpropLine = createRef<Line>();

  const updateWtsTxt = createRef<Txt>();

  const nnLayoutRef = createRef<Layout>();
  view.add(
    <Layout
      layout
      direction={"column"}
      position={[500, 0]}
      ref={nnLayoutRef}
      alignItems={"center"}
      rowGap={20}
    >
      <Latex
        width={150}
        ref={nnInputRef}
        tex="{\color{white} \overrightarrow{w}_{emb}}"
      />

      <Line
        points={[
          [0, -75],
          [0, 75],
        ]}
        stroke={colorScheme.primary}
        lineWidth={5}
        ref={inputLine}
        endArrow
      />

      <Rect
        ref={nnRef}
        stroke={colorScheme.accent}
        lineWidth={5}
        width={200}
        height={200}
        justifyContent={"center"}
        alignItems={"center"}
        wrap={"wrap"}
      >
        <Txt
          text={"Neural \n Network"}
          textAlign={"center"}
          fill={colorScheme.text}
        />
      </Rect>

      <Line
        points={[
          [0, 275],
          [0, 425],
        ]}
        stroke={colorScheme.primary}
        lineWidth={5}
        ref={outputLine}
        endArrow
      />
      <Circle
        size={180}
        stroke={colorScheme.accent}
        lineWidth={5}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Latex size={150} tex="{\color{white} P_{output}}" />
      </Circle>

      <Line
        stroke={colorScheme.secondary}
        lineWidth={5}
        endArrow
        points={[
          [100, 338],
          [300, 338],
          [300, -42.3],
          [110, -42.3],
        ]}
        layout={false}
        lineDash={[10]}
        ref={backpropLine}
      />
      <Txt
        layout={false}
        ref={updateWtsTxt}
        position={[220, 179]}
        text={"Update \n weights"}
        fill={colorScheme.text}
        fontSize={40}
      />
    </Layout>
  );

  yield labelRef().position(embeddingTableRef().left().addX(-100));

  yield inputVectorRef().opacity(0);
  yield functionRef().opacity(0);
  yield mappingVectorRef().opacity(0);
  yield functionMappedRef().opacity(0);
  yield embeddingTableRef().opacity(0);
  yield labelRef().opacity(0);
  yield embedInputVectorRef().opacity(0);
  yield functionEmbeddedRef().opacity(0);
  yield nnLayoutRef().opacity(0);

  yield inputLine().end(0);
  yield outputLine().end(0);
  yield backpropLine().end(0);

  yield updateWtsTxt().opacity(0);

  yield* slideTransition(Direction.Bottom);

  yield* inputVectorRef().opacity(1, 1);
  yield* waitFor(useDuration("input-vector"));

  yield* inputVectorRef().y(-300, 1);
  yield* functionRef().opacity(1, 1);

  yield* waitFor(useDuration("function"));

  // yield* all(inputVectorRef().x(-600, 1), functionRef().x(-600, 1));

  // // mapping animation
  // yield* all(
  //   mappingVectorRef().opacity(1, 1),
  //   functionMappedRef().opacity(1, 1)
  // );

  // yield* all(
  //   mappingVectorRef().opacity(0, 1),
  //   functionMappedRef().opacity(0, 1)
  // );

  // yield* all(inputVectorRef().y(-400, 1), functionRef().y(-200, 1));

  // yield* all(inputVectorRef().scale(0.75, 1), functionRef().scale(0.75, 1));

  // yield* all(inputVectorRef().x(-700, 1), functionRef().x(-700, 1));

  // yield* embeddingTableRef().opacity(1, 1);
  // yield* labelRef().opacity(1, 1);

  // yield* all(
  //   embedInputVectorRef().opacity(1, 1),
  //   functionEmbeddedRef().opacity(1, 1)
  // );

  // yield* nnLayoutRef().opacity(1, 1);
  // const inputLoop: ThreadGenerator = yield loopUntil("End Input", () =>
  //   chain(
  //     updateWtsTxt().opacity(0, 1),
  //     inputLine().end(1, 1),
  //     inputLine().start(1, 1),
  //     inputLine().start(0, 0),
  //     inputLine().end(0, 0),

  //     outputLine().end(1, 1),
  //     outputLine().start(1, 1),
  //     outputLine().start(0, 0),
  //     outputLine().end(0, 0),

  //     updateWtsTxt().opacity(1, 1),

  //     backpropLine().end(1, 1),
  //     backpropLine().start(1, 1),
  //     backpropLine().start(0, 0),
  //     backpropLine().end(0, 0),

  //     embeddings(genRandomNumbers(), 0)
  //   )
  // );

  // yield* join(inputLoop);
});
