— Define Virtual DOM structure

<h1 class="title">Hello World</h1>

const VirtualDom = {
  type: "h1",
  props: { class: "title" },
  children: ["Hello World"]
};
Step 2 — Convert Virtual DOM → Real DOM

function createElement(node) {
  if (typeof node === "string") return document.createTextNode(node);

  const el = document.createElement(node.type);
  if (node.props) {
    Object.entries(node.props).forEach(([k, v]) => el.setAttribute(k, v));
  }
  node.children.forEach(child => el.appendChild(createElement(child)));
  return el;
}
Step 3 — Diffing Algorithm


function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement(parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    const maxLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    );
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}



🛠 Step 4 — Example Counter with Virtual DOM


let state = { count: 0 };
let oldVTree = null;

function Counter() {
  return {
    type: "div",
    props: {},
    children: [
      { type: "h1", props: {}, children: [`Count: ${state.count}`] },
      {
        type: "button",
        props: { onclick: "increment()" },
        children: ["+1"]
      }
    ]
  };
}

function increment() {
  state.count++;
  render(Counter, document.getElementById("app"));
}

function render(component, root) {
  const newVTree = component();
  updateElement(root, newVTree, oldVTree);
  oldVTree = newVTree;
}

render(Counter, document.getElementById("app"));

