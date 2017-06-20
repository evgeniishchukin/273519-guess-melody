export default class AbstractView {

  get template() {
    throw new Error(`View should be defined`);
  }

  get element() {
    if (!this._element) {
      this.getMarkup();
    }

    return this._element;
  }

  render() {
    return this.createElement(this.template);
  }

  bind() {

  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }

  createElement(template) {
    const outer = document.createElement(`template`);
    outer.innerHTML = template;
    return outer.content;
  }

}
