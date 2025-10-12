// web-components/button-example.ts

export function defineButtonExample() {
  if (!customElements.get("button-example")) {
    class ButtonExample extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `<button>Hello from Web Component</button>`;
      }
    }

    customElements.define("button-example", ButtonExample);
  }
}
