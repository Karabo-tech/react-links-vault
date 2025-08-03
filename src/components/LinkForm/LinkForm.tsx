import React, { useState, useEffect } from 'react';
import styles from './LinkForm.module.css';
import type { Link } from '../../types';

interface LinkFormProps {
  onSave: (link: Link) => void;
  linkToEdit?: Link;
}

const LinkForm: React.FC<LinkFormProps> = ({ onSave, linkToEdit }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title);
      setUrl(linkToEdit.url);
      setDescription(linkToEdit.description);
      setTags(linkToEdit.tags.join(', '));
    }
  }, [linkToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link: Link = {
      id: linkToEdit ? linkToEdit.id : Date.now().toString(),
      title,
      url,
      description,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    onSave(link);
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{linkToEdit ? 'Edit Link' : 'Add New Link'}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="url">URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        {linkToEdit ? 'Update' : 'Save'}
      </button>
    </form>
  );
};

export default LinkForm;