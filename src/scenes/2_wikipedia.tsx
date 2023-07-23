import { Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  createRef,
  easeInOutQuint,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

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

  yield* slideTransition(Direction.Bottom);

  yield* wikiDefRef().opacity(1, 1.5, easeInOutQuint);

  yield* wikiDefRef().position.y(-200, 1);
  yield* wikiDefRef().fill(colorScheme.text, 2);

  yield* regularityRef().opacity(1, 2);
  yield* waitFor(3);
});
