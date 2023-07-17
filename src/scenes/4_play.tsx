import { Knot, Spline, makeScene2D } from "@motion-canvas/2d";
import {
  Color,
  Vector2,
  all,
  chain,
  linear,
  makeRef,
  range,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const numLayers = 3;

  const radius = 20;

  const splines: Spline[] = [];

  const initialPetals = 6;
  let numPetals = initialPetals;
  range(numLayers).forEach((layer) => {
    const theta = 360 / numPetals;
    view.add(
      <Spline
        ref={makeRef(splines, layer)}
        lineWidth={4}
        stroke={Color.lerp(colorScheme.primary, colorScheme.accent, layer / 6)}
        closed
      >
        <Knot position={[0, 0]} />
        <Knot
          position={Vector2.fromDegrees(0).scale(160 * (layer + 1))}
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
              160 * (layer + 1)
            )}
            endHandle={Vector2.fromDegrees(theta * (i + 1)).perpendicular.scale(
              40 * (layer + 1)
            )}
          />
        </>
      );
    });

    numPetals += 4;
  });

  yield* splines.map((spline, i) => spline.zIndex(-(i + 1), 0));

  yield* chain(
    ...splines.map((spline, i) => {
      return chain(
        spline.end(0).end(1, 3 * (i + 1), linear),
        spline.opacity(0.75, 1),
        spline.fill(spline.stroke(), 0.75),
      );
    })
  );

  const interval = 5;

  yield* all(
    ...splines.map((spline, i) =>
      spline.rotation(360 * Math.pow(-1, i), splines.length * interval, linear)
    )
  );
});
