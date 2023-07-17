import {
  Circle,
  Gradient,
  Grid,
  Layout,
  Line,
  Rect,
  Spline,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  Vector2,
  createRef,
  makeRef,
  range,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export default makeScene2D(function* (view) {
  // background color
  view.fill(colorScheme.background);

  const initialWidth = 400;
  const rootRectRef = createRef<Rect>();

  view.add(
    <Rect
      ref={rootRectRef}
      size={initialWidth}
      stroke={colorScheme.accent}
      lineDash={[10, 10]}
      lineWidth={3}
    >
      <Circle
        size={2 * initialWidth}
        stroke={colorScheme.accent}
        lineWidth={6}
        position={[initialWidth / 2, initialWidth / 2]}
        startAngle={180}
        endAngle={270}
      />
    </Rect>
  );
  const goldenRatio = 1.618;

  let currentWidth = initialWidth;
  let currentNode = rootRectRef;
  for (let j = 1; j < 10; j++) {
    const width = currentWidth / goldenRatio;
    const childRectRef = createRef<Rect>();
    currentNode().add(
      <Rect
        ref={childRectRef}
        size={width}
        stroke={colorScheme.accent}
        lineWidth={3}
        lineDash={[10, 10]}
      >
        <Circle
          size={2 * width}
          stroke={colorScheme.accent}
          lineWidth={6}
          position={[width / 2, width / 2]}
          startAngle={180}
          endAngle={270}
        />
      </Rect>
    );
    childRectRef().rotation(childRectRef().rotation() + 90);

    if (j % 2 !== 0) {
      childRectRef().position.x(currentWidth / 2 + width / 2);
      childRectRef().position.y(-(currentWidth - width) / 2);
    } else {
      childRectRef().position.x(currentWidth / 2 + width / 2);
      childRectRef().position.y(-(currentWidth - width) / 2);
    }

    currentNode = childRectRef;
    currentWidth = width;
  }

  const newOriginAbs = currentNode().absolutePosition();

  const newOrigin = newOriginAbs.transformAsPoint(rootRectRef().worldToLocal());

  console.log(newOrigin);

  rootRectRef().moveOffset(newOrigin);

  yield* rootRectRef().rotation(360, 10);
});
