import {
  Circle,
  Layout,
  Node,
  Rect,
  Txt,
  grayscale,
  makeScene2D,
} from "@motion-canvas/2d";
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

import { array, numElements } from "../../array";

export default makeScene2D(function* (view) {
  const width = 120;

  const durationSecs = 1.5;

  // Keep track of the running sum
  let runningSum = createSignal(0);

  // Array elements
  const arrayRefs: ArrayElement[] = [];

  const arrayRef = createRef<Layout>();

  const columnGap = 40;

  // index element box
  const sumVarHighlight = createRef<Rect>();

  view.add(
    <Layout columnGap={columnGap} layout x={0} y={-200} ref={arrayRef}>
      {range(numElements).map((i) => (
        <ArrayElement
          width={width}
          data={array[i]}
          ref={makeRef(arrayRefs, i)}
          opacity={0}
        />
      ))}
    </Layout>
  );

  const highlightBoxWidth = width + 30;
  const stride = width + columnGap;
  view.add(
    <Rect
      ref={sumVarHighlight}
      width={highlightBoxWidth}
      height={highlightBoxWidth}
      lineWidth={4}
      x={arrayRefs[0].position.x() - stride}
      y={-200}
      stroke={colorScheme.accent}
    />
  );

  const runningSumContainer = createRef<Rect>();
  const runningSumRef = createRef<Txt>();
  view.add(
    <Rect
      width={width}
      height={width}
      stroke={colorScheme.accent}
      lineWidth={4}
      ref={runningSumContainer}
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

  // /**
  //  * Display the array elements
  //  */
  yield* loop(numElements, (i) => {
    return arrayRefs[i].opacity(1, 0.18);
  });

  // /**
  //  * Sequential addition
  //  */
  yield* loop(numElements + 1, (i) => {
    const prev = runningSum();
    const currentVal = arrayRefs[i - 1]?.data() ?? 0;
    runningSum(prev + currentVal);

    const originalFontSize = runningSumRef().fontSize();
    if (i == numElements) {
      return chain(
        runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
        runningSumRef().fontSize(originalFontSize, 0.1),
        sumVarHighlight().opacity(0, durationSecs)
      );
    }

    return chain(
      sumVarHighlight().position.x(
        sumVarHighlight().position.x() + stride,
        durationSecs
      ),
      runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
      runningSumRef().fontSize(originalFontSize, 0.1)
    );
  });

  // /**
  //  * Parallel addition using reduction
  //  * 1. Nudge the array upwards by a tiny bit
  //  * 2. Move the current sum to a suitable location
  //  * 3. Perform pairwise parallel addition
  //  */

  // yield* all(
  //   arrayRef().position.y(-300, 1),
  //   runningSumContainer().position.x(-800, 1)
  // );

  const layerOne: ArrayElement[] = [];

  // // Create an empty array that sits below the original array
  // view.add(
  //   <Rect x={0} y={-100}>
  //     {range(numRects / 2).map((i) => {
  //       const parentX = arrayRefs[2 * i].absolutePosition();
  //       const nextParentX = arrayRefs[2 * i + 1].absolutePosition();
  //       const currentX = (parentX.x + nextParentX.x) / 2;

  //       const val = (
  //         <ArrayElement data={0} ref={makeRef(layerOne, i)} opacity={1} />
  //       );
  //       console.log(currentX, i);

  //       layerOne[i].absolutePosition([currentX, 0]);
  //       return val;
  //     })}
  //   </Rect>
  // );
});
