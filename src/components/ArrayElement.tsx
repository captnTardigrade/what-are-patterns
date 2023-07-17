import {
  Line,
  Node,
  NodeProps,
  Rect,
  RectProps,
  Txt,
  colorSignal,
  initial,
  signal,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  SimpleSignal,
  Vector2,
  range,
} from "@motion-canvas/core";

export interface ArrayElementProps extends RectProps {
  bgLines?: SignalValue<Boolean>;
  lineColor?: SignalValue<PossibleColor>;
}

export class ArrayElement extends Rect {
  @initial(false)
  @signal()
  public declare readonly bgLines: SimpleSignal<boolean, this>;

  @colorSignal()
  public declare readonly lineColor: ColorSignal<this>;

  public constructor(props?: ArrayElementProps) {
    super({
      clip: true,
      alignItems: "center",
      justifyContent: "center",
      ...props,
    });

    const points = [
      Vector2.fromDegrees(-45).scale(-this.width()),
      Vector2.fromDegrees(-45).scale(this.width()),
    ];

    const numLines = this.width() / Math.SQRT1_2;

    if (props.bgLines)
      this.add(
        range(numLines).map((i) => {
          return (
            <Line
              stroke={props.lineColor}
              lineWidth={2}
              points={points.map((point) =>
                point.add(i * 10 - (numLines - 1) / 2)
              )}
              zIndex={-Infinity}
              layout={false}
              opacity={0.4}
            />
          );
        })
      );
  }
}
