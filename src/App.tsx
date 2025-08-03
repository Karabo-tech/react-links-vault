import React, { useState, useEffect } from 'react';
import LinkForm from './components/LinkForm/LinkForm';
import LinkList from './components/LinkList/LinkList';
import SearchBar from './components/SearchBar/SearchBar';
import type { Link } from './types';
import styles from './App.module.css';

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
  const [linkToEdit, setLinkToEdit] = useState<Link | undefined>(undefined);

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('links');
    if (savedLinks) {
      const parsedLinks: Link[] = JSON.parse(savedLinks);
      setLinks(parsedLinks);
      setFilteredLinks(parsedLinks);
    }
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
    setFilteredLinks(links);
  }, [links]);

  const handleSave = (link: Link) => {
    if (linkToEdit) {
      // Update existing link
      setLinks(links.map((l) => (l.id === link.id ? link : l)));
      setLinkToEdit(undefined);
    } else {
      // Add new link
      setLinks([...links, link]);
    }
  };

  const handleEdit = (link: Link) => {
    setLinkToEdit(link);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setFilteredLinks(
      links.filter(
        (link) =>
          link.title.toLowerCase().includes(lowerQuery) ||
          link.url.toLowerCase().includes(lowerQuery) ||
          link.description.toLowerCase().includes(lowerQuery) ||
          link.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      )
    );
  };

  return (
    <div className={styles.app}>
      <h1>Links Vault</h1>
      <LinkForm onSave={handleSave} linkToEdit={linkToEdit} />
      <SearchBar onSearch={handleSearch} />
      <LinkList links={filteredLinks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;