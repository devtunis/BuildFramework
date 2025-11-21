function createElement<P, T extends string | JSXElementConstructor<P>>(
  type: T,
  props: P,
  key: string | null = null
): ReactElement<P, T> {
  return { type, props, key };
}

const myElement = createElement("div", { className: "hello" }, "div1");
