import { makeProject } from "@motion-canvas/core";

import "./global.css";

import title from "./scenes/0_title?scene";
import intro from "./scenes/1_introduction?scene";
import wiki from "./scenes/2_wikipedia?scene";
import pattern_processing from "./scenes/3_pattern_processing?scene";
import langugage from "./scenes/4_langugage?scene";
import chess from "./scenes/5_chess?scene";
import play from "./scenes/play?scene";
import representation_vs_processing from "./scenes/6_representation_vs_processing?scene";
import motivation_example from "./scenes/7_motivation_example?scene";
import formulation from "./scenes/8_formulation?scene";
import nn from "./scenes/8_1_neural_networks?scene";
import word2vec from "./scenes/8_2_word_2_vec?scene";
import embeddings from "./scenes/8_3_nn?scene";
import ending from "./scenes/9_ending?scene";

import patterns_1 from "../assets/audio/patterns_audio.mp4";

export default makeProject({
  audio: patterns_1,
  scenes: [
    title,
    intro,
    wiki,
    pattern_processing,
    langugage,
    chess,
    representation_vs_processing,
    motivation_example,
    formulation,
    nn,
    word2vec,
    embeddings,
    ending,

    // play,
  ],
});
