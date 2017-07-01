export default class AbstractView {

  get template() {
    throw new Error(`View should be defined`);
  }

  get element() {
    if (!this._element) {
      this._getMarkup();
    }

    return this._element;
  }

  bind() {

  }

  _render() {
    return this._createElement(this.template);
  }

  _getMarkup() {
    this._element = this._render();
    this.bind();
  }

  _createElement(template) {
    const outer = document.createElement(`template`);
    outer.innerHTML = template;
    return outer.content;
  }

}
