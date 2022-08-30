export default class Section {
  constructor( data, renderer, containerSelector) {
    this._items = data; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице (каждого отдельного элемента)
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }

  // Публичный метод, который принимает DOM-элемент и добавляет его в контейнер методом append
  addItem(element) {
    this._container.append(element);
  }

  // Публичный метод, который принимает DOM-элемент и добавляет его в контейнер методом prepend
  addItemPrepend(element) {
    this._container.prepend(element);
  }

  // Публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._items.forEach( item => this._renderer(item));
  }
}
