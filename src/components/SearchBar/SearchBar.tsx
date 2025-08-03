import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by title, URL, description, or tags..."
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;