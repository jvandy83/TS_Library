import { UserForm } from './views/UserForm';
import { User } from './models/User';

const userForm = new UserForm(
  document.getElementById('root'),
  User.buildUser({ name: 'NAME', age: 0 })
);

userForm.model.on('change', () => {
  userForm.render();
});
