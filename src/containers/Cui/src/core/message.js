let id = 0;
const nextID = () => `${++id}`;

export default class Message {
  constructor(data) {
    Object.assign(this, { id: nextID() }, data);
  }
}
