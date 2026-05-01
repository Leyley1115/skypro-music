'use client';
import styles from './filterItem.module.css';

export default function FilterItem({
  value,
  selected,
  onClick,
}: {
  value: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div className={selected ? styles.active : styles.item} onClick={onClick}>
      {value}
    </div>
  );
}
