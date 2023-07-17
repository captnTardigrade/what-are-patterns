import {
  Gradient,
  Img,
  Knot,
  Layout,
  Line,
  Node,
  Spline,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";

import brain from "../../assets/brain-edited.svg";
import {
  Vector2,
  all,
  createRef,
  loop,
  loopFor,
  makeRef,
  range,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);
  const patternSignalRef = createRef<Spline>();
  const patternTextRef = createRef<Txt>();
  const inputRef = createRef<Node>();
  const brainImageRef = createRef<Img>();
  const brainLayoutRef = createRef<Layout>();

  view.add(
    <Layout position={[-400, 0]}>
      <Node ref={inputRef}>
        <Spline
          stroke={
            new Gradient({
              fromX: 0,
              toX: 200,
              stops: [
                { color: colorScheme.accent, offset: 0 },
                { color: colorScheme.primary, offset: 1 },
              ],
            })
          }
          lineWidth={4}
          ref={patternSignalRef}
        >
          <Knot position={[0, 0]} startHandle={Vector2.up.scale(200)} />
          <Knot position={[200, 0]} startHandle={Vector2.up.scale(200)} />
        </Spline>
        <Txt
          position={patternSignalRef().bottomRight().addY(40)}
          text={"Pattern"}
          fill={colorScheme.text}
          ref={patternTextRef}
          opacity={0}
        />
      </Node>
      <Layout ref={brainLayoutRef}>
        <Img ref={brainImageRef} position={[800, 0]} src={brain} width={400} />
      </Layout>
    </Layout>
  );

  const numLines = 6;
  const theta = 360 / numLines;

  const lines: Line[] = [];
  range(numLines).forEach((i) => {
    brainLayoutRef().add(
      <Line
        ref={makeRef(lines, i)}
        lineWidth={6}
        stroke={colorScheme.accent}
        position={[800, 0]}
        points={[
          Vector2.fromDegrees(i * theta).scale(200),
          Vector2.fromDegrees(i * theta).scale(300),
        ]}
      />
    );
  });

  for (let i = 0; i < 2; i++) {
    lines.forEach((line) => line.end(0));

    yield patternSignalRef().end(0).end(1.5, 1.5);
    yield patternTextRef().opacity(1, 1);

    yield* waitFor(1.5);

    yield* all(inputRef().position.x(600, 1.5), inputRef().opacity(0, 1.5));

    yield* all(...lines.map((line) => line.end(1, 0.5)));
    yield* all(...lines.map((line) => line.start(1, 0.5)));

    yield* waitFor(1);

    // // reset the animation
    yield patternSignalRef().end(0);
    yield patternTextRef().opacity(0);
    yield inputRef().position.x(0);
    yield inputRef().opacity(1);
    lines.forEach((line) => line.end(0));
    lines.forEach((line) => line.start(0));
  }

  yield* waitFor(3);
});