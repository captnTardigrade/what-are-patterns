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

export default makeScene2D(function* (view) {
  const width = 120;
  const numRects = 8;

  const durationSecs = 1.5;

  // Keep track of the running sum
  let runningSum = createSignal(0);

  // Array elements
  const arrayRefs: ArrayElement[] = [];

  const arrayRef = createRef<Layout>();

  // index element box
  const sumVarHighlight = createRef<Rect>();

  // view.add(
  //   <Layout columnGap={30} layout x={0} y={-200} ref={arrayRef}>
  //     {range(numRects).map((i) => (
  //       <ArrayElement data={i} ref={makeRef(arrayRefs, i)} opacity={1} />
  //     ))}
  //   </Layout>
  // );

  // view.add(
  //   <Txt text={`${arrayRefs[2].position.x()} | ${arrayRefs[2].data()}`} />
  // );

  view.add(
    <Rect width={100} height={100} fill={"white"}>
      <Circle fill={"black"} y={50} size={75} />
    </Rect>
  );

  const highlightBoxWidth = width + 30;
  // view.add(
  //   <Rect
  //     ref={sumVarHighlight}
  //     width={highlightBoxWidth}
  //     height={highlightBoxWidth}
  //     lineWidth={4}
  //     x={-525 - highlightBoxWidth}
  //     y={-200}
  //     stroke={colorScheme.accent}
  //   />
  // );

  const runningSumContainer = createRef<Rect>();
  const runningSumRef = createRef<Txt>();
  // view.add(
  //   <Rect
  //     width={width}
  //     height={width}
  //     stroke={colorScheme.accent}
  //     lineWidth={4}
  //     ref={runningSumContainer}
  //   >
  //     <Txt
  //       ref={runningSumRef}
  //       fill={colorScheme.accent}
  //       text={() => `${runningSum()}`}
  //     />
  //     <Txt
  //       y={runningSumRef().position.y() + width / 1.25}
  //       fill={colorScheme.accent}
  //       fontSize={24}
  //     >
  //       {"Current Sum"}
  //     </Txt>
  //   </Rect>
  // );

  // /**
  //  * Display the array elements
  //  */
  // yield* loop(numRects, (i) => {
  //   return arrayRefs[i].opacity(1, 1 / (2 * i + 2.5), easeInQuint);
  // });

  // /**
  //  * Sequential addition
  //  */
  // yield* loop(numRects + 1, (i) => {
  //   const prev = runningSum();
  //   const currentVal = arrayRefs[i - 1]?.data() ?? 0;
  //   runningSum(prev + currentVal);

  //   const originalFontSize = runningSumRef().fontSize();
  //   if (i == numRects) {
  //     return chain(
  //       runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
  //       runningSumRef().fontSize(originalFontSize, 0.1),
  //       sumVarHighlight().opacity(0, durationSecs)
  //     );
  //   }

  //   return chain(
  //     sumVarHighlight().position.x(
  //       sumVarHighlight().position.x() + highlightBoxWidth,
  //       durationSecs
  //     ),
  //     runningSumRef().fontSize(originalFontSize * 1.2, 0.1),
  //     runningSumRef().fontSize(originalFontSize, 0.1)
  //   );
  // });

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
