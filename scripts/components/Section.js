// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер

export default class Section {
  constructor({ data, renderer }, containerSelector) { // { items, renderer }
    this._items = data; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице (каждого отдельного элемента)
    this._container = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы
  }

  // перебирает массив данных _initialArray. Вызывает для каждого элемента массива метод setItem
  // публичный метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }

  // публичный метод, который принимает DOM-элемент и добавляет его в контейнер
  // принимает параметр element и вставляет его в контейнер методом append
  addItem(element) {
    this._container.prepend(element);
  }

}
