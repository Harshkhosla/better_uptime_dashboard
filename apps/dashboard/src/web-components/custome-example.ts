export function defineButtonExample2() {
  if (!customElements.get("custome-example1")) {
    class SampleExample extends HTMLElement {
      constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
          <style>
            div {
              background: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
            }
          </style>
          <input />
          <div>1234</div>
          <button>hello</button>
        `;
      }
    }

    customElements.define("custome-example1", SampleExample);
  }
}
