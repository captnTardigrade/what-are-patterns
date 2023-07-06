import {
  Node,
  NodeProps,
  Rect,
  RectProps,
  Txt,
  signal,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export interface ArrayElementProps extends RectProps {
  data: SignalValue<number>;
}

export class ArrayElement extends Rect {
  @signal()
  public declare readonly data: SimpleSignal<number, this>;
  textElement: Txt;

  public constructor(props?: ArrayElementProps) {
    super({
      ...props,
    });

    const textElement = (
      <Txt text={`${this.data()}`} fill={colorScheme[800]}/>
    ) as Txt;

    // assign the text element as a class attribute
    this.textElement = textElement;

    this.add(
      <Rect
        width={props.width}
        height={props.width}
        stroke={colorScheme[800]}
        lineWidth={3}
        radius={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {textElement}
      </Rect>
    );
  }
}
