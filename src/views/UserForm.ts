import { User } from '../models/User';
import { View } from './View';
import { UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  template(): string {
    return `
      <div>
        <input id="input" placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save</button>
      </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSaveClick = (): void => {
    this.model.save();
  };
  onSetNameClick = (): void => {
    const name = document.getElementById('input') as HTMLInputElement;
    this.model.setName(name.value);
  };
}
