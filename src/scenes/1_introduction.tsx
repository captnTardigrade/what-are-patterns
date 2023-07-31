import {
  Grid,
  Img,
  Knot,
  Layout,
  Spline,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  Color,
  Direction,
  ThreadGenerator,
  Vector2,
  all,
  chain,
  createRef,
  join,
  linear,
  makeRef,
  range,
  slideTransition,
  useDuration,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme, transitionDuration } from "../../color_scheme";

import tiles from "../../assets/moroccon_tiles.jpg";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const numLayers = 4;

  const splines: Spline[] = [];

  const layoutRef = createRef<Layout>();

  view.add(<Layout ref={layoutRef}></Layout>);

  const initialPetals = 6;
  let numPetals = initialPetals;
  range(numLayers).forEach((layer) => {
    const theta = 360 / numPetals;
    layoutRef().add(
      <Spline
        ref={makeRef(splines, layer)}
        lineWidth={4}
        fill={Color.lerp(colorScheme[300], colorScheme[900], layer / numLayers)}
        opacity={0}
        closed
      >
        <Knot position={[0, 0]} />
        <Knot
          position={Vector2.fromDegrees(0).scale(120 * (layer + 1))}
          endHandle={Vector2.fromDegrees(0).perpendicular.scale(
            40 * (layer + 1)
          )}
        />
      </Spline>
    );

    range(numPetals - 1).map((i) => {
      splines[layer].add(
        <>
          <Knot position={[0, 0]} />
          <Knot
            position={Vector2.fromDegrees(theta * (i + 1)).scale(
              120 * (layer + 1)
            )}
            endHandle={Vector2.fromDegrees(theta * (i + 1)).perpendicular.scale(
              40 * (layer + 1)
            )}
          />
        </>
      );
    });

    numPetals += 2;
  });

  yield* slideTransition(Direction.Bottom, transitionDuration);

  yield* splines.map((spline, i) => spline.zIndex(-(i + 1), 0));

  yield* chain(
    ...splines.map((spline, i) => spline.opacity(0.8, 0.7 / (i + 1)))
  );

  const interval = useDuration("petalInterval");
  const rotatingPetals: ThreadGenerator = yield all(
    ...splines.map((spline, i) =>
      spline.rotation(180 * Math.pow(-1, i), splines.length * interval, linear)
    )
  );

  yield* waitFor(useDuration("toArchitecture"));
  yield* all(
    layoutRef().position([-500, 0], 0.75),
    layoutRef().scale(0.75, 0.75)
  );

  // architecture
  const imgRef = createRef<Img>();
  view.add(
    <Img
      ref={imgRef}
      src={tiles}
      opacity={0}
      scale={0.65}
      position={[450, 0]}
    />
  );

  yield* imgRef().opacity(1, 1);

  yield* join(rotatingPetals);
});
