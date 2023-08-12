import { Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Direction,
  all,
  createRef,
  easeInOutQuint,
  slideTransition,
  useDuration,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme, transitionDuration } from "../../color_scheme";
import { WordWiseControl } from "../components/WordWiseControl";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const wikiDef = `A pattern is a regularity in the world, in human-made design, or abstract ideas.`;

  const wikiDefRef = createRef<WordWiseControl>();
  view.add(
    <WordWiseControl
      fill={colorScheme.text}
      fontSize={65}
      textWrap
      textAlign={"center"}
      width={"80%"}
      ref={wikiDefRef}
      text={wikiDef}
    />
  );

  yield* slideTransition(Direction.Bottom, transitionDuration);

  yield* all(...wikiDefRef().wordsRef.map((ref) => ref.opacity(1, 1.5)));

  yield* wikiDefRef().wordsRef.map((ref) => ref.fill(colorScheme.text, 2));

  yield* waitFor(useDuration("regularityHighlight"));

  yield* wikiDefRef().getWord(4).fill(colorScheme.primary, 2);

  yield* wikiDefRef().getWord(4).text("regularity", 2);

});
