import { Circle, Node, Rect, makeScene2D } from "@motion-canvas/2d";
import {
  DEFAULT,
  Reference,
  ThreadGenerator,
  chain,
  createRef,
  createSignal,
  join,
  loop,
  waitFor,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export default makeScene2D(function* (view) {
  view.fill(colorScheme.background);
});
