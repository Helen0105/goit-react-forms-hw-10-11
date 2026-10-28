import { Component } from "react";

class Form extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt.currentTarget.elements.name.value);
    console.log(evt.currentTarget.elements.surname.value);
    console.log(evt.currentTarget.elements.email.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"  name="name" placeholder="enter name" />
        <input type="text" name="surname" placeholder="enter second name" />
        <input type="email" name="email" placeholder="enter email" />
        <button type="submit">Відправити</button>
      </form>
    );
  }
}

export default Form;
