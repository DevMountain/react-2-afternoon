export default class Employee {
  constructor(id, name, phone, title) {

    this.id = id;
    this.name = name;
    this.phone = phone;
    this.title = title;

  }
  
  updateName() {
    this.name = name;
  }

  updatePhone() {
    this.phone = phone;
  }

  updateTitle() {
    this.title = title;
  }
}