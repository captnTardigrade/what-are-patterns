import { Circle, Node, Rect, makeScene2D } from "@motion-canvas/2d";
import {
  DEFAULT,
  Reference,
  ThreadGenerator,
  chain,
  createRef,
  join,
  loop,
} from "@motion-canvas/core";
export default makeScene2D(function* (view) {
  const circleRef = createRef<Circle>();
  view.add(
    <Circle fill={"blue"} position={[-400, 0]} size={100} ref={circleRef} />
  );

  const rectRef = createRef<Rect>();
  view.add(<Rect size={100} fill={"red"} ref={rectRef} position={[0, 0]} />);

  const anotherCircleRef = createRef<Circle>();
  view.add(
    <Circle
      size={50}
      position={[400, 0]}
      ref={anotherCircleRef}
      fill={"white"}
    />
  );

  const animateObject = function* <T extends Rect | Circle>(
    objectRef: Reference<T>
  ) {
    yield* loop(3, () =>
      chain(objectRef().scale(10, 2), objectRef().scale(1, 2))
    );
  };

  const animateRect: ThreadGenerator = yield animateObject(rectRef);

  //   yield* animateObject(circleRef);
  yield* join(yield animateObject(circleRef), animateRect);
});
