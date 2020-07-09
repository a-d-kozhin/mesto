// класс для отрисовки элементов на странице
export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  // публичный метод для отрисовки всех элементов массива с помощью функции renderer
  renderItems() {
    this._initialArray.forEach(item => this._renderer(item));
  }

  // публичный метод, принимающий DOM-элемент и добавляющий его в контейнер
  setItem(element) {
    this._container.prepend(element);
  }
}