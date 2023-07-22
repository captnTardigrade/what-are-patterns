import {
  Layout,
  Node,
  NodeProps,
  Txt,
  TxtProps,
  signal,
} from "@motion-canvas/2d";
import {
  Reference,
  SignalValue,
  SimpleSignal,
  createRef,
  makeRef,
} from "@motion-canvas/core";

export interface WordWiseControlProps extends TxtProps {
  text: SignalValue<string>;
}

export class WordWiseControl extends Node {
  @signal()
  public declare readonly text: SimpleSignal<string, this>;

  words: string[];
  wordsRef: Txt[] = [];

  layoutRef: Reference<Layout>;

  public constructor(props?: WordWiseControlProps) {
    super({
      ...props,
    });

    this.words = this.text().split(" ");

    this.words.forEach((word, i) => (
      <Txt text={word} fill={props.fill} ref={makeRef(this.wordsRef, i)} />
    ));

    this.layoutRef = createRef<Layout>();

    this.add(
      <Layout layout columnGap={20} ref={this.layoutRef}>
        {...this.wordsRef}
      </Layout>
    );
  }

  public getWord(index: number) {
    const word = this.wordsRef[index];
    return word;
  }

  public setWord(index: number, text: string) {
    this.wordsRef[index].text(text);
  }

  public *animateLayoutWords() {
    yield* this.layoutRef().width(1000, 1);
    yield* this.layoutRef().columnGap(90, 1);
  }
}
