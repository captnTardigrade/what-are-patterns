import { Img, Layout, Line, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import {
  Direction,
  Vector2,
  all,
  createRef,
  slideTransition,
  useDuration,
  waitFor,
} from "@motion-canvas/core";

import hear from "../../assets/hear.svg";
import notes from "../../assets/notes.svg";
import knowledge from "../../assets/knowledge.svg";
import cpu from "../../assets/cpu.svg";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const humanTextRef = createRef<Txt>();
  view.add(
    <Txt
      ref={humanTextRef}
      text={"Human"}
      x={-420}
      y={-350}
      fill={colorScheme.text}
      fontSize={75}
    />
  );

  const computerTextRef = createRef<Txt>();
  view.add(
    <Txt
      ref={computerTextRef}
      text={"Computer"}
      x={420}
      y={-350}
      fill={colorScheme.text}
      fontSize={75}
    />
  );

  const hearImgRef = createRef<Img>();
  view.add(
    <Layout
      ref={hearImgRef}
      x={-650}
      layout
      direction={"column"}
      alignItems={"center"}
    >
      <Img src={hear} size={180} />
      <Txt text={"Process"} fill={colorScheme.text} />
    </Layout>
  );

  const notesImgRef = createRef<Img>();
  view.add(
    <Layout
      ref={notesImgRef}
      x={-150}
      layout
      direction={"column"}
      alignItems={"center"}
    >
      <Img src={notes} size={180} />
      <Txt text={"Represent"} fill={colorScheme.text} />
    </Layout>
  );

  const humanProcessingRef = createRef<Line>();
  view.add(
    <Line
      ref={humanProcessingRef}
      lineWidth={5}
      stroke={"white"}
      points={[hearImgRef().right, notesImgRef().left]}
      endArrow
    />
  );

  // divider
  const dividerLine = createRef<Line>();
  view.add(
    <Line
      ref={dividerLine}
      lineWidth={10}
      stroke={"white"}
      points={[Vector2.up.scale(350), Vector2.down.scale(350)]}
    />
  );

  const knowledgeImgRef = createRef<Img>();
  view.add(
    <Layout
      ref={knowledgeImgRef}
      x={150}
      layout
      direction={"column"}
      alignItems={"center"}
    >
      <Img src={knowledge} size={180} />
      <Txt text={"Represent"} fill={colorScheme.text} />
    </Layout>
  );

  const processImgRef = createRef<Img>();
  view.add(
    <Layout
      ref={processImgRef}
      x={600}
      layout
      direction={"column"}
      alignItems={"center"}
    >
      <Img src={cpu} size={180} />
      <Txt text={"Process"} fill={colorScheme.text} />
    </Layout>
  );

  const computerProcessingRef = createRef<Line>();
  view.add(
    <Line
      ref={computerProcessingRef}
      lineWidth={5}
      stroke={"white"}
      points={[knowledgeImgRef().right, processImgRef().left().addX(-10)]}
      endArrow
    />
  );

  yield humanTextRef().opacity(0);
  yield computerTextRef().opacity(0);

  yield hearImgRef().opacity(0);
  yield notesImgRef().opacity(0);

  yield humanProcessingRef().end(0);
  yield computerProcessingRef().end(0);

  yield knowledgeImgRef().opacity(0);

  yield processImgRef().opacity(0);
  yield computerProcessingRef().end(0);

  yield dividerLine().start(1);
  yield* slideTransition(Direction.Top);

  yield* dividerLine().start(0, 1.5);

  yield* waitFor(useDuration("show-human-repr"))

  yield* humanTextRef().opacity(1, 1.5);
  yield* hearImgRef().opacity(1, 1.5);
  yield* humanProcessingRef().end(1, 1.5);
  yield* notesImgRef().opacity(1, 1.5);

  yield* computerTextRef().opacity(1, 1.5);
  yield* knowledgeImgRef().opacity(1, 1.5);
  yield* computerProcessingRef().end(1, 1.5);
  yield* processImgRef().opacity(1, 1.5);

  yield* waitFor(useDuration("end-repr"))
});
