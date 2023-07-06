// import {
//   Circle,
//   Layout,
//   Line,
//   Rect,
//   Txt,
//   makeScene2D,
// } from "@motion-canvas/2d";
// import { Vector2, createRef, createSignal, waitFor } from "@motion-canvas/core";

// export default makeScene2D(function* (view) {
//   const rectOne = createRef<Rect>();
//   const circleOne = createRef<Circle>();

//   const rectTwo = createRef<Rect>();
//   const circleTwo = createRef<Circle>();

//   const pos = Vector2.createSignal(0);

//   view.add(
//     <Layout layout>
//       <Rect position={pos} ref={rectOne} size={240} fill={"red"}>
//         <Circle ref={circleOne} size={50} fill={"yellow"} />
//       </Rect>
//       <Rect ref={rectTwo} size={240} fill={"blue"}>
//         <Circle ref={circleTwo} size={50} fill={"green"} />
//       </Rect>
//     </Layout>
//   );

//   view.add(
//     <>
//       <Txt
//         text={() =>
//           `One ${circleOne().position()} ${circleOne().absolutePosition()} ${rectOne().position()}`
//         }
//         x={600}
//         fontSize={20}
//         fill={"white"}
//       />
//       <Txt
//         text={() =>
//           `Two ${circleTwo().position()} ${circleTwo().absolutePosition()} ${rectTwo().position()}`
//         }
//         x={600}
//         y={40}
//         fontSize={20}
//         fill={"white"}
//       />
//     </>
//   );

//   /**
//    * 1. Get the absolute position of the red square's center
//    * 2. Set the circle to that absolute location
//    */
//   const sqareOneCenter = pos().transformAsPoint(rectOne().localToWorld());
//   circleOne().absolutePosition(Vector2.zero);

//   console.log(sqareOneCenter);
// });

import { Nord } from "@hhenrichsen/motion-canvas-nord";
import { Layout, Line, Rect, Txt } from "@motion-canvas/2d";
import { makeScene2D } from "@motion-canvas/2d";
import { CodeBlock } from "@motion-canvas/2d/lib/components/CodeBlock";
import {
  Reference,
  Vector2,
  createRef,
  makeRef,
  range,
  waitFor,
} from "@motion-canvas/core";

const stagedScale = 2;
const stagedColor = Nord.Colors.Aurora3;
const staged1Pos = new Vector2([-150, -300]);
const staged2Pos = new Vector2([150, -300]);
const finalPos = new Vector2([0, -300]);

const titleSize = 50;

export default makeScene2D(function* (view) {
  const rects: Rect[] = [];
  const txts: Txt[] = [];
  const containerRef: Reference<Layout> = createRef();
  const titleRef: Reference<Txt> = createRef();
  const dataText = "[5, 3, 10, 4, 6, 11, 10]";
  const data = eval(dataText);
  const fnText = "const fn = (accum, curr) => accum + curr;";
  const runFn = (a: number, b: number): number =>
    eval(fnText + `\nfn(${a}, ${b})`);

  view.add(
    <>
      <Txt
        y={-view.height() / 2 + titleSize * 1.5}
        ref={titleRef}
        fontFamily={"Greycliff CF"}
        fontSize={titleSize}
        fill={Nord.Colors.SnowStorm0}
        text={"Get accumulator and next"}
      ></Txt>
      <CodeBlock
        y={-view.height() / 2 + titleSize * 3.5}
        fontFamily={"Ellograph CF"}
        theme={Nord.Theme}
        fontSize={titleSize * 0.66}
        code={"const data = " + dataText + ";"}
      ></CodeBlock>
      <CodeBlock
        y={-view.height() / 2 + titleSize * 4.5}
        fontFamily={"Ellograph CF"}
        theme={Nord.Theme}
        fontSize={titleSize * 0.66}
        code={fnText}
      ></CodeBlock>
      <Line
        points={[
          [-30, -290 + titleSize * 0.66],
          [55, -290 + titleSize * 0.66],
        ]}
        stroke={Nord.Colors.Aurora3}
        lineWidth={5}
      />
      <Line
        points={[
          [-170, -290 + titleSize * 0.66],
          [-70, -290 + titleSize * 0.66],
        ]}
        stroke={Nord.Colors.Aurora4}
        lineWidth={5}
      />
      <Rect
        // layout
        fill={"white"}
        height={200}
        ref={containerRef}
        columnGap={30}
        y={300}
      >
        {range(data.length).map((i) => (
          <Rect
            ref={makeRef(rects, i)}
            size={100}
            fill={Nord.Colors.Frost3}
            x={-((150 * (Math.min(9, data.length) - 1)) / 2) + 150 * i}
            radius={10}
          >
            <Txt
              ref={makeRef(txts, i)}
              text={JSON.stringify(data[i])}
              fill={Nord.Colors.SnowStorm0}
              fontFamily={"Ellograph CF"}
            ></Txt>
          </Rect>
        ))}
      </Rect>
    </>
  );

  // yield* rects[0].fill(stagedColor, 1);
  yield* rects[0].position(staged1Pos, 1);
  yield* rects[0].position(staged2Pos, 1);
  // yield rects[0].scale(stagedScale, 1);
  // for (let i = 0; i < data.length - 1; i++) {
  //   yield* dealWithRects(
  //     containerRef(),
  //     titleRef(),
  //     rects,
  //     txts,
  //     i,
  //     i > 5 ? 0.33 : 1,
  //     runFn
  //   );
  // }

  // yield* titleRef().text("Final Answer", 1);
  // yield rects[data.length - 1].position(finalPos.addX(-containerRef().x()), 1);
  // yield* rects[data.length - 1].scale(3, 1);
  yield* waitFor(3);
});

function* dealWithRects(
  container: Layout,
  title: Txt,
  rects: Rect[],
  txts: Txt[],
  index: number,
  timeScale: number,
  runFn: (a: number, b: number) => number
) {
  const prevOffset = container.x();
  yield rects[index].position(staged1Pos.addX(-prevOffset + 75), 1 * timeScale);
  yield rects[index].fill(Nord.Colors.Aurora4, 1 * timeScale);
  yield* container.x(prevOffset - 75, 1 * timeScale);
  const currentOffset = container.x();
  if (timeScale >= 1) {
    yield* title.text("Get accumulator and next", 1);
  } else {
    yield title.text("Continue processing...", 1);
  }

  const oldFill1 = rects[index].fill();
  const oldPosition1 = rects[index].position();
  const oldFill2 = rects[index + 1].fill();
  const oldPosition2 = rects[index + 1].position();

  yield* rects[index + 1].fill(stagedColor, 1 * timeScale);
  yield rects[index + 1].position(
    staged2Pos.addX(-currentOffset),
    1 * timeScale
  );
  yield rects[index + 1].scale(stagedScale, 1 * timeScale);

  if (timeScale >= 1) {
    yield* title.text("Run function on current and accumulator", 1 * timeScale);
  }
  yield* waitFor(1 * timeScale);

  yield rects[index].opacity(0, 1 * timeScale);
  yield rects[index].position(finalPos.addX(-currentOffset), 1 * timeScale);
  yield rects[index + 1].position(finalPos.addX(-currentOffset), 1 * timeScale);
  yield* waitFor(0.5 * timeScale);
  yield rects[index + 1].fill(Nord.Colors.Aurora4, 1 * timeScale);
  yield txts[index + 1].text(
    String(
      runFn(parseInt(txts[index].text()), parseInt(txts[index + 1].text()))
    ),
    0
  );

  yield* waitFor(1 * timeScale);
}
