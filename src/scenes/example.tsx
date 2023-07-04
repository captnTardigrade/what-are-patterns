import { Node, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  easeInQuint,
  loop,
  makeRef,
  range,
} from "@motion-canvas/core";

import { colorScheme } from "../../color_scheme";
import { ArrayElement } from "../components/ArrayElement";

export default makeScene2D(function* (view) {
  const width = 120;
  const numRects = 8;

  const durationSecs = 1.5;

  // Keep track of the running sum
  let runningSum = createSignal(0);

  // Array elements
  const arrayRefs: ArrayElement[] = [];

  // index element box
  const sumVarHighlight = createRef<Rect>();

  view.add(
    <Rect x={0} y={-200} layout columnGap={30}>
      {range(numRects).map((i) => (
        <ArrayElement data={i + 7} ref={makeRef(arrayRefs, i)} opacity={0} />
      ))}
    </Rect>
  );

  const highlightBoxWidth = width + 30;
  view.add(
    <Rect
      ref={sumVarHighlight}
      width={highlightBoxWidth}
      height={highlightBoxWidth}
      lineWidth={4}
      x={-525 - highlightBoxWidth}
      y={-200}
      stroke={colorScheme.accent}
    />
  );

  const runningSumRef = createRef<Txt>();
  view.add(
    <Rect
      width={width}
      height={width}
      stroke={colorScheme.accent}
      lineWidth={4}
    >
      <Txt
        ref={runningSumRef}
        fill={colorScheme.accent}
        text={() => `${runningSum()}`}
      />
      <Txt
        y={runningSumRef().position.y() + width / 1.25}
        fill={colorScheme.accent}
        fontSize={24}
      >
        {"Current Sum"}
      </Txt>
    </Rect>
  );

  yield* loop(numRects, (i) => {
    return arrayRefs[i].opacity(1, 1 / (2 * i + 2.5), easeInQuint);
  });

  yield* loop(numRects + 1, (i) => {
    const prev = runningSum();
    const currentVal = arrayRefs[i - 1]?.data() ?? 0;
    runningSum(prev + currentVal);

    const originalFontSize = runningSumRef().fontSize();
    if (i == numRects) {
      return chain(
        runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
        runningSumRef().fontSize(originalFontSize, 0.1),
        sumVarHighlight().opacity(0, durationSecs)
      );
    }

    return chain(
      sumVarHighlight().position.x(
        sumVarHighlight().position.x() + highlightBoxWidth,
        durationSecs
      ),
      runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
      runningSumRef().fontSize(originalFontSize, 0.1)
    );
  });
});
