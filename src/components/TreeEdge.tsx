import { Circle, Line, LineProps } from "@motion-canvas/2d/lib/components";
import {
  ColorSignal,
  PossibleColor,
} from "@motion-canvas/core/lib/types/Color";
import { colorSignal, initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Origin, Vector2 } from "@motion-canvas/core/lib/types";
// import { Catppuccin } from '../styles/Colours';

export interface TreeEdgeProps extends LineProps {
  colour?: PossibleColor;
  node1: SignalValue<Circle>;
  node2: SignalValue<Circle>;
}

export class TreeEdge extends Line {
  @initial("red")
  @colorSignal()
  public declare readonly colour: ColorSignal<this>;

  @signal()
  public declare readonly node1: SimpleSignal<Circle, this>;

  @signal()
  public declare readonly node2: SimpleSignal<Circle, this>;

  private readonly treeEdge = createRef<Line>();

  public constructor(props?: TreeEdgeProps) {
    super({
      zIndex: -1,
      ...props,
    });

    this.add(
      <Line
        layout={false}
        ref={this.treeEdge}
        stroke={"red"}
        lineWidth={10}
        points={() => [
          this.node1()
            .getOriginDelta(Origin.Middle)
            .transformAsPoint(this.node1().localToWorld()),
          this.node2()
            .getOriginDelta(Origin.Middle)
            .transformAsPoint(this.node2().localToWorld()),
        ]}
        end={0}
      ></Line>
    );
  }

  public *show() {
    this.treeEdge().absolutePosition(Vector2.zero);
    yield* this.treeEdge().end(1, 0.5);
  }
}
