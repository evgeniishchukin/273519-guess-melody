export default class AbstractView {

  get template() {
    throw new Error(`View should be defined`);
  }

  get element() {
    if (!this._element) {
      this.create();
    }

    return this._element;
  }

  render() {
    return this.createElement(this.template);
  }

  bind() {

  }

  create() {
    this._element = this.render();
    this.bind();
  }

  createElement(template) {
    const outer = document.createElement(`template`);
    outer.innerHTML = template;
    return outer.content;
  }

  show() {
    const mainScreen = document.querySelector(`.main`);
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(this.element);
  }
}
