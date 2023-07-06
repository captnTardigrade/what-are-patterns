import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/introduction?scene";
import reduction from "./scenes/2_parallel?scene";
import play from "./scenes/3_play?scene";

export default makeProject({
  scenes: [
    // intro,
    reduction,
    // play,
  ],
});
