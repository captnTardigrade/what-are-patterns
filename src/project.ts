import { makeProject } from "@motion-canvas/core";

import "./global.css";

import intro from "./scenes/1_introduction?scene";
import wiki from "./scenes/2_wikipedia?scene";
import pattern_processing from "./scenes/3_pattern_processing?scene";
import langugage from "./scenes/4_langugage?scene";
import chess from "./scenes/5_chess?scene";
import play from "./scenes/play?scene";

import reduction from "./scenes/2_parallel?scene";
import flower from "./scenes/2_flower?scene";
import fibonacci from "./scenes/3_play?scene";
import abstract_pattern from "./scenes/4_play?scene";
import arcs from "./scenes/5_arcs?scene";

const font = new FontFace(
  "Courgette-Regular",
  'local("Courgette-Regular"), url("/fonts/Courgette-Regular.ttf") format("truetype")'
);

document.fonts.add(font);
font.load();

export default makeProject({
  scenes: [
    // intro,
    // wiki,
    // pattern_processing,
    // langugage,
    chess,

    // play,
    // reduction,
    // flower,
    // fibonacci,
    // abstract_pattern,
    // arcs
  ],
});
