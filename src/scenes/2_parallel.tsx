import { Layout, Line, Rect, makeScene2D } from "@motion-canvas/2d";
import {
  Vector2,
  all,
  createRef,
  createSignal,
  loop,
  makeRef,
  range,
  useRandom,
  waitFor,
} from "@motion-canvas/core";
import { ArrayElement } from "../components/ArrayElement";

export default makeScene2D(function* (view) {
  // For now, numRects is restriced to powers of 2
  const numElements = 8;

  const random = useRandom();
  const arr = random.intArray(numElements, 1, 10);

  const numLayers = Math.log2(numElements) + 1;

  const arrayVals: ArrayElement[][] = range(numLayers).map(() => []);

  const width = 120;

  arr.forEach((val, i) => {
    const positionSignal = Vector2.createSignal(0);
    <ArrayElement
      width={width}
      position={positionSignal}
      data={val}
      ref={makeRef(arrayVals[0], i)}
    />;
  });

  for (let layer = 1; layer < numLayers; layer++) {
    let index = 0;
    range(numElements / Math.pow(2, layer)).map((i) => {
      const parentOne = arrayVals[layer - 1][2 * i];
      const parentTwo = arrayVals[layer - 1][2 * i + 1];

      const data = parentOne.data() + parentTwo.data();

      <ArrayElement
        width={width}
        data={data}
        ref={makeRef(arrayVals[layer], index)}
        opacity={0}
      />;
      arrayVals[layer][i].textElement.opacity(0);
      index++;
    });
  }

  const rootLayerRef = createRef<Layout>();

  view.add(
    <Layout ref={rootLayerRef} y={-200}>
      {range(numLayers).map((i) => (
        <Layout width={"100%"}>{...arrayVals[i]}</Layout>
      ))}
    </Layout>
  );

  const containerWidth = width + 40;
  const offset = ((arrayVals[0].length - 1) * containerWidth) / 2;
  let index = 0;
  for (const val of arrayVals[0]) {
    val.position.x(containerWidth * index - offset);
    val.position.y(0);
    index++;
  }

  for (let layer = 1; layer < numLayers; layer++) {
    let index = 0;
    for (const val of arrayVals[layer]) {
      const parentOne = arrayVals[layer - 1][2 * index];
      const parentTwo = arrayVals[layer - 1][2 * index + 1];

      const parentOnePos = parentOne.position();
      const parentTwoPos = parentTwo.position();

      val.position.x((parentOnePos.x + parentTwoPos.x) / 2);
      val.position.y(layer * containerWidth);
      index++;
    }
  }

  const lines: Line[][] = range(numLayers).map(() => []);

  // connect the layers with lines
  for (let layer = 1; layer < numLayers; layer++) {
    let index = 0;
    for (const val of arrayVals[layer]) {
      const parentOne = arrayVals[layer - 1][2 * index];
      const parentTwo = arrayVals[layer - 1][2 * index + 1];

      const parentOnePos = parentOne.position().addY(width / 2);
      const parentTwoPos = parentTwo.position().addY(width / 2);

      const line = (
        <Line
          ref={makeRef(lines[layer - 1], 2 * index)}
          lineWidth={4}
          stroke={"black"}
          points={[parentOnePos, val.position().addY(-width / 2)]}
          opacity={0}
        />
      );
      rootLayerRef().add(line);

      const line2 = (
        <Line
          ref={makeRef(lines[layer - 1], 2 * index + 1)}
          lineWidth={4}
          stroke={"black"}
          points={[parentTwoPos, val.position().addY(-width / 2)]}
          opacity={0}
        />
      );
      rootLayerRef().add(line2);
      index++;
    }
  }

  for (let layer = 1; layer < numLayers; layer++) {
    // show empty boxes for the second layer
    yield* all(
      ...arrayVals[layer].map((val) => {
        return val.opacity(1, 1);
      })
    );

    // show the lines connecting the second layer
    yield* all(
      ...lines[layer - 1].map((line) => {
        return line.opacity(1, 1);
      })
    );

    // show the text for the second layer
    yield* all(
      ...arrayVals[layer].map((val) => {
        return val.textElement.opacity(1, 1);
      })
    );
  }

  yield* waitFor(5);
});
