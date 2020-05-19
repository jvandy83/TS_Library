import { User } from '../models/User';

export class UserForm {
  parent: HTMLElement;
  model: User;
  cache: DocumentFragment[] = [];

  constructor(parent, model) {
    this.parent = parent;
    this.model = model;
    this.render();
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <input id="input" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
    this.model.trigger('change');
  };
  onSetNameClick = (): void => {
    const name = document.getElementById('input') as HTMLInputElement;
    this.model.setName(name.value);
    this.model.trigger('change');
  };

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

  render(): void {
    this.parent.innerHTML = '';
    const templateElement: HTMLTemplateElement = document.createElement(
      'template'
    );
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }

  // updateRender(): void {
  //   const templateElement: HTMLTemplateElement = document.createElement(
  //     'template'
  //   );
  //   templateElement.innerHTML = this.template();

  //   this.bindEvents(templateElement.content);

  //   if (this.cache['template']) {
  //     this.parent.replaceChild(templateElement.content, this.cache[0]);
  //   }
  // }
}
