import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';

export default function Filter({
  label,
  values,
  open,
  onToggle,
  selectedValues,
  onSelect,
}: {
  label: string;
  values: string[];
  open: boolean;
  onToggle: () => void;
  selectedValues: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className={styles.filter__button} onClick={onToggle}>
      {label}

      {open && (
        <div
          className={styles.filter__modal}
          onClick={(e) => e.stopPropagation()}
        >
          {values.map((v) => (
            <FilterItem
              key={v}
              value={v}
              selected={selectedValues.includes(v)}
              onClick={() => onSelect(v)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
