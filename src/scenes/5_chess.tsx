import { Img, Layout, Node, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme, transitionDuration } from "../../color_scheme";
import {
  Direction,
  all,
  createRef,
  easeInOutCubic,
  slideTransition,
  useDuration,
  waitFor,
} from "@motion-canvas/core";

import kasparov from "../../assets/deep_blue_vs_kasparov_game_1.png";
import insanity from "../../assets/insane_board_position.png";
import rules from "../../assets/chess_rules.png";
import the_chaos from "../../assets/the_chaos_poem.png";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);

  const imageRef = createRef<Img>();

  const gmDialogRef = createRef<Node>();
  const gmDialogMsgRef = createRef<Txt>();

  view.add(
    <Layout>
      <Img
        opacity={0}
        ref={imageRef}
        src={kasparov}
        size={680}
        position={[-400, 0]}
      />
      <Layout
        layout
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        rowGap={40}
        ref={gmDialogRef}
      >
        <Rect
          stroke={colorScheme.accent}
          lineWidth={4}
          width={200}
          height={80}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Txt text={"Chess GM"} fill={colorScheme.accent} fontSize={40} />
        </Rect>
        <Txt
          fill={colorScheme.text}
          fontSize={30}
          opacity={0}
          ref={gmDialogMsgRef}
        />
      </Layout>
    </Layout>
  );

  const srcRef = createRef<Txt>();
  view.add(
    <Txt
      ref={srcRef}
      text={"Moonwalking with Einstein, Joshua Foer"}
      fill={colorScheme.text}
      fontSize={30}
      position={[650, 478]}
      fontStyle={"italic"}
      opacity={0}
    />
  );

  yield* slideTransition(Direction.Bottom, transitionDuration);

  yield* gmDialogRef().position.x(500, 2, easeInOutCubic);
  yield* imageRef().opacity(1, 3);

  yield* srcRef().opacity(1, useDuration("src"));
  yield* gmDialogMsgRef().opacity(1, 2);

  yield* gmDialogMsgRef().text("That's Deep Blue vs Kasparov Game 1", 2);
  yield* waitFor(3);
  imageRef().src(insanity);
  yield* gmDialogMsgRef().text("", 2);
  yield* gmDialogMsgRef().text("What is this insanity?", 2);

  yield* waitFor(useDuration("chess-rules"));

  yield* gmDialogMsgRef().text("", 3);

  imageRef().src(rules);
  yield* gmDialogMsgRef().text(
    "The white rook is in-line with the black king",
    2
  );

  yield* waitFor(useDuration("chess-rules-end"));

  yield* all(
    gmDialogRef().opacity(0, 2),
    srcRef().opacity(0, 2),
    imageRef().opacity(0, 2)
  );

  gmDialogRef().remove();
  srcRef().remove();

  imageRef().src(the_chaos);

  yield* imageRef().opacity(1, 1.5);

  const txtRefLayout = createRef<Layout>();
  view.add(
    <Layout ref={txtRefLayout} opacity={0}>
      <Txt
        text={"The Chaos - Gerard Nolst Trenité"}
        fill={colorScheme.text}
        fontSize={50}
        position={[400, -230]}
        width={500}
      />
      <Txt
        text={"Yeah... English is definitely a troll language"}
        position={[500, -150]}
        fontSize={35}
        fill={colorScheme.text}
        fontStyle={"italic"}
      />
    </Layout>
  );

  yield* txtRefLayout().opacity(1, 1.5);

  yield* waitFor(useDuration("the-chaos"));
});
