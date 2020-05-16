import { User } from './models/User';

const user = new User({ name: 'Lichen', age: 79 });

console.log(user.get('name'));
