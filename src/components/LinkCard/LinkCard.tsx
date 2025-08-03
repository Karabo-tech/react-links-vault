import React from 'react';
import styles from './LinkCard.module.css';
import type { Link } from '../../types';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <h3>{link.title}</h3>
      <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {link.url}
      </a>
      <p>{link.description}</p>
      <div className={styles.tags}>
        {link.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <div className={styles.actions}>
        <button onClick={() => onEdit(link)} className={styles.editButton}>Edit</button>
        <button onClick={() => onDelete(link.id)} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default LinkCard;