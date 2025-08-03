import React from 'react';
import LinkCard from '../LinkCard/LinkCard';
import styles from './LinkList.module.css';
import type { Link } from '../../types';

interface LinkListProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
  return (
    <div className={styles.list}>
      {links.length === 0 ? (
        <p>No links found.</p>
      ) : (
        links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default LinkList;