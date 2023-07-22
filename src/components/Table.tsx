import {
  Layout,
  LayoutProps,
  NodeProps,
  Rect,
  Txt,
  signal,
} from "@motion-canvas/2d";
import {
  ColorSignal,
  PossibleColor,
  SignalValue,
  SimpleSignal,
  range,
} from "@motion-canvas/core";
import { colorScheme } from "../../color_scheme";

export interface TableProps extends LayoutProps {
  data: SignalValue<string[]>;
  stroke: SignalValue<PossibleColor>;
  nCols: SignalValue<number>;
}

export class Table extends Layout {
  @signal()
  public declare data: SimpleSignal<string[], this>;

  @signal()
  public declare readonly stroke: ColorSignal<this>;

  @signal()
  public declare readonly nCols: SimpleSignal<number, this>;

  public constructor(props?: TableProps) {
    super({
      ...props,
    });

    const width = props.width as number;

    this.add(
      <Layout layout wrap={"wrap"} width={width}>
        {...range(this.data().length).map((val) => {
          return (
            <Rect
              width={width / this.nCols()}
              height={100}
              stroke={props.stroke}
              lineWidth={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Txt text={() => `${this.data()[val]}`} fill={colorScheme.text} />
            </Rect>
          );
        })}
      </Layout>
    );
  }
}
