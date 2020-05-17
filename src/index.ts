import { User } from './models/User';

const user = User.buildUser({ id: 1 });

user.on('change', () => console.log(user));
user.on('error', () => console.log('User could not be saved.'));

user.fetch();
