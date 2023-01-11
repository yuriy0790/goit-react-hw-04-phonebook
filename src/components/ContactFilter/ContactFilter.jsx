import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ filter, onChange }) => {
  return (
    <label className={styles.label}>
      Find contacts by name:
      <input
        className={styles.input}
        onChange={onChange}
        value={filter}
        type="text"
        name="filter"
      />
    </label>
  );
};

export default ContactFilter;

ContactFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
