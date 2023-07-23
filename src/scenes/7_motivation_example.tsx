import { Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import {
  Direction,
  all,
  createRef,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { WordWiseControl } from "../components/WordWiseControl";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const dogTxtRef = createRef<WordWiseControl>();
  view.add(
    <WordWiseControl
      ref={dogTxtRef}
      text={"A dog is wearing a shirt"}
      fill={colorScheme.text}
    />
  );

  const catTxtRef = createRef<WordWiseControl>();
  view.add(
    <WordWiseControl
      ref={catTxtRef}
      text={"The cat is wears a tie"}
      fill={colorScheme.text}
    />
  );

  const horseTxtRef = createRef<WordWiseControl>();
  view.add(
    <WordWiseControl
      ref={horseTxtRef}
      text={"The horse is wearing a ..."}
      fill={colorScheme.text}
    />
  );

  yield dogTxtRef().opacity(0);
  yield catTxtRef().opacity(0);
  yield horseTxtRef().opacity(0);
  yield* slideTransition(Direction.Right);

  yield* dogTxtRef().opacity(1, 1);
  yield* dogTxtRef().y(-100, 1);
  yield* catTxtRef().opacity(1, 1);

  yield* all(dogTxtRef().y(-200, 1), catTxtRef().y(-100, 1));

  yield* horseTxtRef().opacity(1, 1);

  yield* all(
    dogTxtRef().animateLayoutWords(),
    catTxtRef().animateLayoutWords(),
    horseTxtRef().animateLayoutWords()
  );

  yield* all(
    dogTxtRef().getWord(0).fill(colorScheme.accent, 1),
    catTxtRef().getWord(0).fill(colorScheme.accent, 1),
    horseTxtRef().getWord(0).fill(colorScheme.accent, 1)
  );

  yield* all(
    dogTxtRef().getWord(3).fill(colorScheme.primary, 1),
    catTxtRef().getWord(3).fill(colorScheme.primary, 1),
    horseTxtRef().getWord(3).fill(colorScheme.primary, 1)
  );

  yield* all(
    dogTxtRef().getWord(5).fill(colorScheme.secondary, 1),
    catTxtRef().getWord(5).fill(colorScheme.secondary, 1),
    horseTxtRef().getWord(5).fill(colorScheme.secondary, 1)
  );

  yield* horseTxtRef().getWord(5).text("hat", 0.5);

  yield* waitFor(2);
});
