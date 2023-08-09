import {
  Circle,
  LineProps as CircleProps,
} from "@motion-canvas/2d/lib/components";
import {
  ColorSignal,
  PossibleColor,
} from "@motion-canvas/core/lib/types/Color";
import { colorSignal, initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SimpleSignal } from "@motion-canvas/core/lib/signals";
import { colorScheme } from "../../color_scheme";
import { loopFor } from "@motion-canvas/core";
import { useRandom } from "@motion-canvas/core";

export interface KnobProps extends CircleProps {
  colour?: PossibleColor;
}

export class Knob extends Circle {
  @initial("red")
  @colorSignal()
  public declare readonly colour: ColorSignal<this>;

  @signal()
  public declare readonly node1: SimpleSignal<Circle, this>;

  @signal()
  public declare readonly node2: SimpleSignal<Circle, this>;

  public constructor(props?: KnobProps) {
    super({
      ...props,
    });

    this.add(
      <Circle
        fill={colorScheme.primary}
        size={this.size()}
        layout
        justifyContent={"end"}
        rotation={Math.random() * 360}
      >
        <Circle layout ref={props.ref} size={15} fill={colorScheme.text} />
      </Circle>
    );
  }

  public *randomRotate(duration: number, initialRotation?: number) {
    yield* loopFor(duration, () => {
      const degrees = initialRotation ?? useRandom().gauss() * 90;
      return this.rotation(degrees, 2).to(-degrees / 2, 2);
    });
  }
}
