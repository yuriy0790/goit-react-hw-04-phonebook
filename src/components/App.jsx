import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import { GlobalStyleComponent } from 'styles/GlobalStyles';
import AddContactForm from './AddContactForm/AddContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Notification from './Notification/Notification';
import { Container } from './Container/Container.styled';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState(
    JSON.parse(window.localStorage.getItem('filter')) ?? ''
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    window.localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  const countTotalContacts = () => {
    return contacts.length;
  };

  const deleteContact = contactId => {
    for (const contact of contacts) {
      if (contact.id === contactId) {
        Notiflix.Notify.success(`"${contact.name}" successfully deleted`);
      }
    }
    // setContacts(contacts.filter(el => el.id !== contactId));
    //як правильно?  в чому буде різниця?
    setContacts(contacts => contacts.filter(el => el.id !== contactId));
  };

  const formSubmitHandler = data => {
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

    // setContacts([contact, ...contacts]);
    //як правильно?  в чому буде різниця?
    setContacts(contacts => [contact, ...contacts]);

    Notiflix.Notify.success(
      `"${contact.name}" successfully added to contact list`
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <Container>
      <Section title="Phonebook">
        <AddContactForm onSubmit={formSubmitHandler} />
        <ContactFilter filter={filter} onChange={changeFilter} />
      </Section>
      <Section title="Contacts">
        {countTotalContacts() ? (
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          <Notification message="There is no contacts" />
        )}
      </Section>

      <GlobalStyleComponent />
    </Container>
  );
}
