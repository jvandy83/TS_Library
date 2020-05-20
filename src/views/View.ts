import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  parent: HTMLElement;
  model: T;

  constructor(parent, model) {
    this.parent = parent;
    this.model = model;
    this.bindModel();
  }

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';
    const templateElement: HTMLTemplateElement = document.createElement(
      'template'
    );
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.mapRegions(templateElement.content);

    this.parent.append(templateElement.content);

    this.onRender();
  }

  bindEvents = (fragment: DocumentFragment): void => {
    let eventsMap = this.eventsMap();
    for (let entry in eventsMap) {
      let [event, selector] = entry.split(':');
      let callback = eventsMap[entry];
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(event, callback);
      });
    }
  };

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }
}
