import { Img, Layout, Node, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { colorScheme } from "../../color_scheme";
import { createRef, easeInOutCubic, waitFor } from "@motion-canvas/core";

import kasparov from "../../assets/deep_blue_vs_kasparov_game_1.png";
import insanity from "../../assets/insane_board_position.png";

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

  yield* gmDialogRef().position.x(500, 2, easeInOutCubic);
  yield* imageRef().opacity(1, 3);
  yield* gmDialogMsgRef().opacity(1, 2);

  yield* gmDialogMsgRef().text("That's Deep Blue vs Kasparov Game 1", 2);
  yield* waitFor(3);
  imageRef().src(insanity);
  yield* gmDialogMsgRef().text("", 0);
  yield* gmDialogMsgRef().text("What is this insanity?", 2);

  yield* waitFor(4);
});
