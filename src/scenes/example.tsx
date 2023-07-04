import { Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  loop,
  makeRef,
  range,
} from "@motion-canvas/core";

import { colorScheme } from "../../color_scheme";
import { ArrayElement } from "../components/ArrayElement";

export default makeScene2D(function* (view) {
  const width = 120;
  const numRects = 8;

  // Keep track of the running sum
  let runningSum = createSignal(0);

  // Array elements
  const arrayRefs: ArrayElement[] = [];

  // index element box
  const sumVarHighlight = createRef<Rect>();

  view.add(
    <Rect x={0} y={-200} layout columnGap={30}>
      {range(numRects).map((i) => (
        <ArrayElement data={i + 7} ref={makeRef(arrayRefs, i)} />
      ))}
    </Rect>
  );

  view.add(
    <Rect
      ref={sumVarHighlight}
      width={width + 30}
      height={width + 30}
      lineWidth={4}
      x={-525 - 150}
      y={-200}
      stroke={colorScheme[500]}
    />
  );

  view.add(
    <Rect width={width} height={width} lineWidth={4}>
      <Txt text={() => `${runningSum()}`} />
    </Rect>
  );

  yield* sumVarHighlight().position.x(-525, 2);

  yield* loop(numRects, (i) => {
    if (i + 1 == numRects) {
      // if we have reached the end, then make the box disappear
      return sumVarHighlight().opacity(0, 2);
    }

    const prev = runningSum();
    const currentVal = arrayRefs[i].data();
    runningSum(prev + currentVal);
    return sumVarHighlight().position.x((i + 1) * 150 - 525, 2);
  });
});
