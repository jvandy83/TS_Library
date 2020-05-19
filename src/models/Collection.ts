import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './User';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  rootUrl: string;
  deserialize: (json: K) => T;

  constructor(rootUrl, deserialize) {
    this.rootUrl = rootUrl;
    this.deserialize = deserialize;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios
      .get(this.rootUrl)
      .then((res: AxiosResponse) => {
        res.data.forEach((value) => {
          this.models.push(this.deserialize(value));
        });
        this.trigger('change');
      })
      .catch((err) => console.log(err));
  }
}
