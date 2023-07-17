import { Circle, makeScene2D } from "@motion-canvas/2d";
import { Vector2, range } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.add(<Circle size={50} fill={"red"} />);

  const numArcs = 10;

  const theta = 360 / numArcs;

  range(numArcs).forEach((i) => {
    view.add(
      <Circle
        size={100}
        position={Vector2.fromDegrees(theta * i).scale(64)}
        stroke={"white"}
        lineWidth={4}
      />
    );
  });
});
