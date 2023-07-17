import { Knot, Spline, makeScene2D } from "@motion-canvas/2d";
import { Vector2, createRef, fadeTransition, range } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const numPetals = 9;

  const splineRef = createRef<Spline>();

  const theta = 360 / numPetals;
  view.add(
    <Spline ref={splineRef} lineWidth={4} stroke={"white"} closed>
      {...range(numPetals).map((i) => {
        return (
          <>
            <Knot position={[0, 0]} />
            <Knot
              position={Vector2.fromDegrees(theta * i).scale(160)}
              endHandle={Vector2.fromDegrees(theta * i).perpendicular.scale(40)}
            />
          </>
        );
      })}
    </Spline>
  );

  yield* splineRef().end(0).end(1, 5);
});
