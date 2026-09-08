import { useEffect, useState } from 'react';
import { filterGroups, sortOptions } from '../catalog';

export default function useCatalogQuery() {
  const [search, setSearch] = useState(() => window.location.search);
  useEffect(() => {
    const update = () => setSearch(window.location.search);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  const params = new URLSearchParams(search);
  const filters = Object.fromEntries(filterGroups.map(group => [group.id, params.getAll(group.id).filter(value => group.options.some(option => option.value === value))]));
  const sort = sortOptions.some(([value]) => value === params.get('sort')) ? params.get('sort') : 'popular';
  const update = changes => {
    const next = new URLSearchParams(window.location.search);
    Object.entries(changes).forEach(([key, value]) => {
      next.delete(key);
      (Array.isArray(value) ? value : value == null ? [] : [value]).forEach(item => next.append(key, item));
    });
    if (!('page' in changes)) next.delete('page');
    window.history.pushState(null, '', `${window.location.pathname}?${next}`);
    setSearch(next.toString());
  };
  return { params, filters, sort, update, page: Math.max(1, Math.floor(Number(params.get('page')) || 1)) };
}
