import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { matches } from '../catalog';
import styles from '../ProductListing.module.css';

export default function FilterPanel({ groups, filters, products, onChange, prefix }) {
  const [expanded, setExpanded] = useState(['price', 'color', 'material']);
  const [showAll, setShowAll] = useState([]);
  return groups.map(group => {
    const open = expanded.includes(group.id);
    const selected = filters[group.id] || [];
    return <section className={styles.filterGroup} key={group.id}>
      <h3><button type="button" aria-expanded={open} aria-controls={`${prefix}-${group.id}`} onClick={() => setExpanded(current => open ? current.filter(id => id !== group.id) : [...current, group.id])}>
        <span>{group.label}{selected.length > 0 && <small> · {selected.length}</small>}</span>{open ? <Minus size={15} aria-hidden="true" /> : <Plus size={15} aria-hidden="true" />}
      </button></h3>
      <div id={`${prefix}-${group.id}`} hidden={!open}>
        <div className={group.type === 'size' ? styles.sizes : styles.options}>
          {group.options.slice(0, showAll.includes(group.id) ? undefined : 6).map(option => {
            const checked = selected.includes(option.value);
            const count = products.filter(product => matches(product, filters, group.id) && matches(product, { [group.id]: [option.value] })).length;
            return <label key={option.value} className={`${styles.option} ${group.type === 'size' ? styles.size : ''}`}>
              <input type="checkbox" checked={checked} onChange={() => onChange(group.id, checked ? selected.filter(value => value !== option.value) : [...selected, option.value])} />
              {option.color && <span className={styles.swatch} style={{ background: option.color }} aria-hidden="true" />}
              <span>{option.label}</span>{group.type !== 'size' && <small>{count}</small>}
            </label>;
          })}
        </div>
        {group.options.length > 6 && <button className={styles.textButton} onClick={() => setShowAll(current => current.includes(group.id) ? current.filter(id => id !== group.id) : [...current, group.id])}>{showAll.includes(group.id) ? 'Thu gọn' : '+ Xem thêm'}</button>}
      </div>
    </section>;
  });
}
