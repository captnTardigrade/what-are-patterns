import {
  Grid,
  Layout,
  Line,
  Node,
  Txt,
  arcTo,
  makeScene2D,
} from "@motion-canvas/2d";
import { colorScheme, transitionDuration } from "../../color_scheme";
import {
  Direction,
  PossibleVector2,
  Vector2,
  all,
  createRef,
  createRefArray,
  createSignal,
  easeInOutCubic,
  fadeTransition,
  slideTransition,
  useDuration,
  waitFor,
} from "@motion-canvas/core";
export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  view.add(
    <Grid
      stroke={colorScheme.primary}
      opacity={0.5}
      spacing={50}
      size={"100%"}
    />
  );

  const axesLines = createRefArray<Line>();

  view.add(
    <Line
      ref={axesLines}
      points={[
        [-750, 300],
        [500, 300],
      ]}
      lineWidth={5}
      stroke={colorScheme[500]}
      end={0}
      endArrow
    />
  );

  view.add(
    <Line
      ref={axesLines}
      points={[
        [-500, -500],
        [-500, 500],
      ]}
      lineWidth={5}
      stroke={colorScheme[500]}
      start={1}
      startArrow
    />
  );

  const origin = new Vector2(-500, 300);

  const textLayout = createRef<Layout>();
  view.add(
    <Layout ref={textLayout} layout columnGap={50} position={[300, -400]} />
  );

  yield* fadeTransition(transitionDuration);

  const queenRef = createRef<Txt>();
  const queenPosition = createSignal(new Vector2(-200, -150));
  const queenColor = "yellow";
  textLayout().add(
    <Txt
      ref={queenRef}
      text={"Queen"}
      fill={queenColor}
      height={100}
      opacity={0}
    />
  );

  const subRef = createRef<Txt>();
  textLayout().add(
    <Txt
      text={"-"}
      fill={colorScheme.text}
      height={100}
      opacity={0}
      ref={subRef}
    />
  );

  const womanRef = createRef<Txt>();
  const womanPosition = createSignal(new Vector2(-350, 200));
  const womanColor = colorScheme.primary;
  textLayout().add(
    <Txt
      ref={womanRef}
      text={"Woman"}
      fill={womanColor}
      height={100}
      opacity={0}
    />
  );

  const addRef = createRef<Txt>();
  textLayout().add(
    <Txt
      text={"+"}
      fill={colorScheme.text}
      height={100}
      opacity={0}
      ref={addRef}
    />
  );

  const manRef = createRef<Txt>();
  const manPosition = createSignal(new Vector2(-600, 200));
  const manColor = colorScheme.secondary;
  textLayout().add(
    <Txt ref={manRef} text={"Man"} fill={manColor} height={100} opacity={0} />
  );

  const kingRef = createRef<Txt>();
  const kingColor = colorScheme.accent;
  const kingPosition = createSignal(
    queenPosition().sub(womanPosition()).add(manPosition())
  );
  textLayout().insert(
    <Txt
      ref={kingRef}
      text={"King"}
      fill={kingColor}
      height={100}
      opacity={0}
    />,
    0
  );

  const equalRef = createRef<Txt>();
  textLayout().insert(
    <Txt
      text={"="}
      fill={colorScheme.text}
      height={100}
      opacity={0}
      ref={equalRef}
    />,
    1
  );

  const queenLine = createRef<Line>();
  view.add(
    <Line
      points={[origin, queenPosition]}
      lineWidth={4}
      stroke={queenColor}
      endArrow
      arrowSize={10}
      zIndex={-1}
      ref={queenLine}
      end={0}
    />
  );

  const womanPosStart = createSignal<Vector2>(origin);
  const womanPosEnd = createSignal<Vector2>(womanPosition);
  const womanLine = createRef<Line>();
  view.add(
    <Line
      points={[womanPosStart, womanPosEnd]}
      lineWidth={4}
      stroke={womanColor}
      endArrow
      arrowSize={10}
      zIndex={-1}
      ref={womanLine}
      end={0}
    />
  );

  const manPosStart = createSignal<Vector2>(origin);
  const manPosEnd = createSignal<Vector2>(manPosition);
  const manLine = createRef<Line>();
  view.add(
    <Line
      points={[manPosStart, manPosEnd]}
      lineWidth={4}
      stroke={manColor}
      endArrow
      arrowSize={10}
      zIndex={-1}
      ref={manLine}
      end={0}
    />
  );

  const kingLine = createRef<Line>();
  view.add(
    <Line
      points={[origin, kingPosition]}
      lineWidth={4}
      stroke={kingColor}
      endArrow
      arrowSize={10}
      zIndex={-1}
      ref={kingLine}
      end={0}
    />
  );

  const manResVector = queenPosition().add(manPosition()).sub(origin);

  const womanResVector = queenPosition().add(womanPosition()).sub(origin);

  yield* all(axesLines[0].end(1, 2), axesLines[1].start(0, 2));

  yield* waitFor(useDuration("words"));

  yield* all(queenRef().opacity(1, 1), queenLine().end(1, 1));
  yield* all(womanRef().opacity(1, 1), womanLine().end(1, 1));
  yield* all(manRef().opacity(1, 1), manLine().end(1, 1));
  yield* all(kingRef().opacity(1, 1), kingLine().end(1, 1));

  yield* waitFor(useDuration("embed-king"));

  yield* all(
    equalRef().opacity(1, 1),
    subRef().opacity(1, 1),
    addRef().opacity(1, 1)
  );

  yield* all(manPosStart(queenPosition(), 2), manPosEnd(manResVector, 2));
  yield* all(womanPosStart(queenPosition(), 2), womanPosEnd(womanResVector, 2));

  yield* all(womanPosEnd(manResVector, 2), womanPosStart(kingPosition(), 2));

  const womanStart = womanPosStart();
  const womanEnd = womanPosEnd();

  yield* all(womanPosStart(womanEnd, 2), womanPosEnd(womanStart, 2));

  yield* waitFor(useDuration("end-embed"));
});
