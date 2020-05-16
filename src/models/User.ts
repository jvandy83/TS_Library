import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

const URI = 'http://localhost:3000/users';

export interface UserProps {
  id?: number;
  age?: number;
  name?: string;
}

export class User {
  public event: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(URI);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.event.on;
  }

  get trigger() {
    return this.event.trigger;
  }

  get get() {
    return this.attributes.get;
  }
}
