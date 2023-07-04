import { Node, NodeProps, Rect, Txt, signal } from "@motion-canvas/2d";
import {
  ReferenceReceiver,
  SignalValue,
  SimpleSignal,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export interface ArrayElementProps extends NodeProps {
  data: SignalValue<number>;
  ref: ReferenceReceiver<ArrayElement>;
}

export class ArrayElement extends Node {
  @signal()
  public declare readonly data: SimpleSignal<number, this>;

  public constructor(props?: ArrayElementProps) {
    super({
      ...props,
    });

    const width = 120;

    this.add(
      <Rect
        ref={props.ref}
        width={width}
        height={width}
        stroke={colorScheme[800]}
        lineWidth={3}
        radius={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Txt x={0} y={0} text={`${this.data()}`} fill={colorScheme[800]} />
      </Rect>
    );
  }
}
