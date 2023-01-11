import { Component } from 'react';
import Notiflix from 'notiflix';
import { GlobalStyleComponent } from 'styles/GlobalStyles';
import AddContactForm from './AddContactForm/AddContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import { Container } from './Container/Container.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  countTotalContacts = () => {
    const { contacts } = this.state;
    return contacts.length;
  };

  deleteContact = contactId => {
    const { contacts } = this.state;

    for (const contact of contacts) {
      if (contact.id === contactId) {
        Notiflix.Notify.success(`"${contact.name}" successfully deleted`);
      }
    }

    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== contactId),
    }));
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const { name, number } = data;

    const existingName = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );

    const existingNumber = contacts.find(el => el.number === number);

    if (existingName) {
      Notiflix.Notify.failure(`"${name}" is allready in contact list`);
      return;
    }

    if (existingNumber) {
      Notiflix.Notify.failure(
        `You allready have contact "${existingNumber.name}" with same number "${number}" in contact list`
      );
      return;
    }

    const contact = {
      id: data.number,
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    Notiflix.Notify.success(
      `"${contact.name}" successfully added to contact list`
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));

    if (localContacts) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Container>
        <Section title="Phonebook">
          <AddContactForm onSubmit={this.formSubmitHandler} />
          <ContactFilter filter={filter} onChange={this.changeFilter} />
        </Section>
        <Section title="Contacts">
          {this.countTotalContacts() ? (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <Notification message="There is no contacts" />
          )}
        </Section>

        <GlobalStyleComponent />
      </Container>
    );
  }
}
