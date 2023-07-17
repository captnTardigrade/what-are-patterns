import { Grid, Img, Layout, Line, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  Vector2,
  createRef,
  easeInOutQuint,
  fadeTransition,
  linear,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

import brain_vs_computer from "../../assets/brain.svg";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const wikiDef = `A pattern is a regularity in the world, in human-made design, or abstract ideas.`;

  const wikiDefRef = createRef<Txt>();
  view.add([
    <Txt
      fill={colorScheme.primary}
      fontSize={65}
      textWrap
      textAlign={"center"}
      width={"80%"}
      ref={wikiDefRef}
      opacity={0}
      text={wikiDef}
    />,
  ]);

  const regularityRef = createRef<Txt>();
  view.add(
    <Txt
      fill={colorScheme.primary}
      fontSize={65}
      text={"What is regularity?"}
      opacity={0}
      ref={regularityRef}
    />
  );

  // view.add(
  //   <Img src={brain_vs_computer} stroke="white" width={100} height={100} />
  // );

  yield* slideTransition(Direction.Bottom);

  yield* wikiDefRef().opacity(1, 1.5, easeInOutQuint);

  yield* wikiDefRef().position.y(-200, 1);
  yield* wikiDefRef().fill(colorScheme.text, 2);

  yield* regularityRef().opacity(1, 2);
  yield* waitFor(3);
});
