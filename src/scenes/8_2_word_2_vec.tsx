import {
  Grid,
  Layout,
  Line,
  Node,
  Txt,
  arcTo,
  makeScene2D,
} from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import {
  PossibleVector2,
  Vector2,
  all,
  createRef,
  createSignal,
  easeInOutCubic,
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

  view.add(
    <Line
      points={[
        [-750, 300],
        [500, 300],
      ]}
      lineWidth={5}
      stroke={colorScheme[500]}
    />
  );

  view.add(
    <Line
      points={[
        [-500, -500],
        [-500, 500],
      ]}
      lineWidth={5}
      stroke={colorScheme[500]}
    />
  );

  const origin = new Vector2(-500, 300);

  const textLayout = createRef<Layout>();
  view.add(
    <Layout ref={textLayout} layout columnGap={50} position={[300, -400]} />
  );

  const queenRef = createRef<Txt>();
  const queenPosition = createSignal(new Vector2(-200, -150));
  const queenColor = "yellow";
  textLayout().add(
    <Txt ref={queenRef} text={"Queen"} fill={queenColor} height={100} />
  );

  textLayout().add(<Txt text={"-"} fill={colorScheme.text} height={100} />);

  const womanRef = createRef<Txt>();
  const womanPosition = createSignal(new Vector2(-350, 200));
  const womanColor = colorScheme.primary;
  textLayout().add(
    <Txt ref={womanRef} text={"Woman"} fill={womanColor} height={100} />
  );

  textLayout().add(<Txt text={"+"} fill={colorScheme.text} height={100} />);

  const manRef = createRef<Txt>();
  const manPosition = createSignal(new Vector2(-600, 200));
  const manColor = colorScheme.secondary;
  textLayout().add(
    <Txt ref={manRef} text={"Man"} fill={manColor} height={100} />
  );

  const kingRef = createRef<Txt>();
  const kingColor = colorScheme.accent;
  const kingPosition = createSignal(
    queenPosition().sub(womanPosition()).add(manPosition())
  );
  textLayout().insert(
    <Txt ref={kingRef} text={"King"} fill={kingColor} height={100} />,
    0
  );

  textLayout().insert(
    <Txt text={"="} fill={colorScheme.text} height={100} />,
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
    />
  );

  const manResVector = queenPosition().add(manPosition()).sub(origin);

  const womanResVector = queenPosition().add(womanPosition()).sub(origin);

  yield* all(manPosStart(queenPosition(), 2), manPosEnd(manResVector, 2));
  yield* all(womanPosStart(queenPosition(), 2), womanPosEnd(womanResVector, 2));

  yield* all(womanPosEnd(manResVector, 2), womanPosStart(kingPosition(), 2));

  const womanStart = womanPosStart();
  const womanEnd = womanPosEnd();

  yield* all(womanPosStart(womanEnd, 2), womanPosEnd(womanStart, 2));

  yield* waitFor(useDuration("end-embed"));
});
