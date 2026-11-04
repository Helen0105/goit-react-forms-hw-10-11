import "./App.css";
import { nanoid } from "nanoid";
import { Component } from "react";
import Form from "./components/Form/Form";
import { Filter } from "./components/Filter/Filter";
import { ContactList } from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    console.log("Викликався >>> componentDidMount");
    const savedContacts = localStorage.getItem('contacts');
    if(savedContacts) {
      this.setState({contacts: JSON.parse(savedContacts)})
      // ///
    }
  }

componentDidUpdate(_, prevState) {
  console.log("Викликався >>> componentDidUpdate");
  if(prevState.contacts !== this.state.contacts) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  }
}

  formSubmitHandler = (data) => {
    const { contacts } = this.state;
    
    const name = data.name.toLowerCase();
    const exists = contacts.some(
      contact => contact.name.toLowerCase() === name
    );

    if (exists) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const visibleContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        

        <ContactList 
          contacts={visibleContacts} 
          onDelete={this.deleteContact} 
        />
      </div>
    );
  }
}

export default App;