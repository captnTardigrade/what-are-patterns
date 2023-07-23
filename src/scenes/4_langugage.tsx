import { Layout, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import {
  Direction,
  ThreadGenerator,
  Vector2,
  all,
  createRef,
  join,
  linear,
  loopUntil,
  makeRef,
  range,
  sequence,
  slideTransition,
  useDuration,
  useRandom,
  waitFor,
} from "@motion-canvas/core";
export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  yield document.fonts.ready;

  const characterRef = createRef<Txt>();

  view.add(
    <Txt
      ref={characterRef}
      text={"A"}
      fill={colorScheme.text}
      fontSize={200}
      position={[0, 0]}
      opacity={0}
      fontFamily={"Courgette"}
      strokeFirst
    />
  );

  yield* slideTransition(Direction.Top);

  yield* characterRef().opacity(1, 1.5);

  yield* characterRef()
    .fill(colorScheme.primary, 1.5)
    .to(colorScheme.secondary, 1.5);

  yield* characterRef().position(Vector2.fromDegrees(-90).scale(300), 1.5);

  yield* waitFor(1);

  // audio signal
  const audioSignalRef = createRef<Layout>();

  const random = useRandom(1337);
  const rects: Rect[] = [];

  view.add(
    <Layout ref={audioSignalRef} layout gap={10} alignItems="center">
      {range(40).map((i) => (
        <Rect
          ref={makeRef(rects, i)}
          radius={5}
          width={10}
          height={10}
          fill={colorScheme.text}
        />
      ))}
    </Layout>
  );

  const audioAnimation: ThreadGenerator = yield loopUntil("Stop Audio", () =>
    sequence(
      0.04,
      ...rects.map((rect) =>
        all(
          // highlight-next-line
          rect.size.y(random.nextInt(100, 200), 0.5).to(10, 0.5),
          rect.fill(colorScheme.primary, 0.5).to(colorScheme.secondary, 0.5)
        )
      )
    )
  );

  yield* audioSignalRef().position(
    Vector2.up.scale(200),
    useDuration("Move Audio")
  );

  const teluguTextRef = createRef<Txt>();

  view.add(
    <Txt
      ref={teluguTextRef}
      fill={colorScheme.primary}
      fontSize={100}
      position={[0, 0]}
    />
  );

  yield* teluguTextRef().text(
    "తినగా తినగా వేపాకు తియ్యగుండు",
    useDuration("Text End"),
    linear
  );

  yield* join(audioAnimation);
  yield* waitFor(3);
});
