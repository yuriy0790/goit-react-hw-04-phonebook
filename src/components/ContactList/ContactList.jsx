import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <>
    <p className={styles.contact}>Found {contacts.length} contacts</p>
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.listItem} key={id}>
          <p className={styles.contact}>{name}:</p>
          <p className={styles.contact}>{number}</p>
          <button
            className={styles.delBtn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </>
);
export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
