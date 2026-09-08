import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { productTypes } from '../../data/mockData';
import { useWishlist } from '../../context/WishlistContext';
import FilterPanel from './components/FilterPanel';
import ListingProductCard from './components/ListingProductCard';
import useCatalogQuery from './hooks/useCatalogQuery';
import { categories, filterGroups, filtersByType, products, selectProducts, sortOptions } from './catalog';
import styles from './ProductListing.module.css';

export default function ProductListing() {
  const { params, filters, sort, page, update } = useCatalogQuery();
  const categoryId = params.get('category');
  const category = categories.find(item => item.id === categoryId);
  const type = productTypes.find(item => item.id === (category?.type || params.get('type'))) || productTypes[0];
  const title = category?.name || (categoryId ? 'Danh mục sản phẩm' : params.has('type') ? type.name : 'Tất cả sản phẩm');
  const catalog = products.filter(product => categoryId ? product.category === categoryId : type.id === 'bedding');
  const groups = filterGroups.filter(group => filtersByType[type.id].includes(group.id) && (group.id !== 'product' || categoryId === 'duvet'));
  const results = selectProducts(catalog, filters, sort);
  const pages = Math.max(1, Math.ceil(results.length / 9));
  const currentPage = Math.min(page, pages);
  const visible = results.slice((currentPage - 1) * 9, currentPage * 9);
  const chips = filterGroups.flatMap(group => group.options.filter(option => filters[group.id]?.includes(option.value)).map(option => ({ ...option, group: group.id })));
  const wishlist = useWishlist();
  const [draft, setDraft] = useState(null);
  const dialog = useRef(null);
  const sortMenu = useRef(null);
  const filterButton = useRef(null);
  const resultsRef = useRef(null);
  useEffect(() => {
    const oldTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const oldDescription = meta?.content;
    document.title = `${title} | Everon Thủ Đức`;
    if (meta) meta.content = `Khám phá ${title.toLowerCase()} Everon. Tìm sản phẩm theo chất liệu, màu sắc, kích thước và mức giá phù hợp.`;
    return () => { document.title = oldTitle; if (meta) meta.content = oldDescription; };
  }, [title]);
  useEffect(() => {
    const closeSort = event => { if (!sortMenu.current?.contains(event.target)) sortMenu.current?.removeAttribute('open'); };
    document.addEventListener('pointerdown', closeSort);
    return () => document.removeEventListener('pointerdown', closeSort);
  }, []);
  useEffect(() => {
    if (!draft) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = oldOverflow; };
  }, [draft]);
  const clear = () => update(Object.fromEntries(filterGroups.map(group => [group.id, []])));
  const closeDrawer = () => { dialog.current.close(); setDraft(null); filterButton.current?.focus(); };
  const changePage = (event, next) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); update({ page: next }); resultsRef.current?.scrollIntoView({ block: 'start' }); resultsRef.current?.focus({ preventScroll: true });
  };
  const pageHref = next => { const query = new URLSearchParams(params); query.set('page', next); return `/products?${query}`; };
  return <main id="main-content" className={`${styles.page} shell`}>
    <nav aria-label="Đường dẫn" className={styles.breadcrumb}><a href="/">Trang chủ</a><span>/</span><a href="/products">Sản phẩm</a>{category && <><span>/</span><a href={type.href}>{type.name}</a></>}<span>/</span><span aria-current="page">{title}</span></nav>
    <header className={styles.intro}>
      <div><p className="eyebrow">Êm ái trong từng khoảnh khắc</p><h1>{title}</h1><p className={styles.description}>Chất liệu mềm mại, sắc màu tinh tế. Tìm chút bình yên<br className={styles.desktopBreak} /> cho không gian nghỉ ngơi của riêng bạn.</p></div>
      <div className={styles.introNote}><span>EVERON</span><p>Nâng niu giấc ngủ.<br />Vẹn tròn tổ ấm.</p><span className={styles.noteLine} /></div>
    </header>
    <nav className={styles.categories} aria-label="Danh mục liên quan">{categories.filter(item => item.type === type.id).map(item => <a key={item.id} href={`/products?type=${item.type}&category=${item.id}`} aria-current={item.id === categoryId ? 'page' : undefined}>{item.name}</a>)}</nav>
    <div className={styles.catalog}>
      <aside className={styles.sidebar} aria-label="Lọc sản phẩm"><div className={styles.sidebarTitle}><SlidersHorizontal size={17} aria-hidden="true" /><h2>Bộ lọc</h2>{chips.length > 0 && <button onClick={clear} className={styles.textButton}>Xóa tất cả</button>}</div><FilterPanel groups={groups} filters={filters} products={catalog} prefix="desktop" onChange={(key, values) => update({ [key]: values })} /></aside>
      <section className={styles.results} aria-label="Danh sách sản phẩm" ref={resultsRef} tabIndex={-1}>
        <div className={styles.toolbar}>
          <p role="status"><strong>{results.length}</strong> sản phẩm</p>
          <button ref={filterButton} className={styles.filterTrigger} onClick={() => { setDraft(filters); dialog.current.showModal(); }}><SlidersHorizontal size={17} aria-hidden="true" /> Bộ lọc{chips.length ? ` (${chips.length})` : ''}</button>
          <details ref={sortMenu} className={styles.sort} onKeyDown={event => { if (event.key === 'Escape') { sortMenu.current.removeAttribute('open'); sortMenu.current.querySelector('summary').focus(); } }}>
            <summary><span className={styles.sortLabel}>Sắp xếp theo:</span> {sortOptions.find(([value]) => value === sort)[1]}<ChevronDown size={15} aria-hidden="true" /></summary>
            <div className={styles.sortOptions} role="group" aria-label="Sắp xếp sản phẩm">{sortOptions.map(([value, label]) => <button key={value} aria-pressed={value === sort} onClick={() => { update({ sort: value }); sortMenu.current.removeAttribute('open'); sortMenu.current.querySelector('summary').focus(); }}>{label}{value === sort && <Check size={15} aria-hidden="true" />}</button>)}</div>
          </details>
        </div>
        {chips.length > 0 && <div className={styles.chips}><span>Đang lọc:</span>{chips.map(chip => <button key={`${chip.group}-${chip.value}`} onClick={() => update({ [chip.group]: filters[chip.group].filter(value => value !== chip.value) })} aria-label={`Bỏ bộ lọc ${chip.label}`}>{chip.label}<X size={13} aria-hidden="true" /></button>)}<button className={styles.clearChip} onClick={clear}>Xóa tất cả</button></div>}
        {visible.length ? <div className={styles.grid}>{visible.map((product, index) => <ListingProductCard key={product.id} product={product} index={index} favorite={wishlist.has(product.id)} onFavorite={() => wishlist.toggle(product.id)} />)}</div> : <div className={styles.empty}><SlidersHorizontal size={30} strokeWidth={1} aria-hidden="true" /><h2>Không tìm thấy sản phẩm phù hợp</h2><p>Thử thay đổi hoặc xóa một số bộ lọc để xem thêm sản phẩm.</p>{chips.length ? <button className={styles.primary} onClick={clear}>Xóa bộ lọc</button> : <a className={styles.primary} href="/products?type=bedding&category=duvet">Khám phá chăn và vỏ chăn</a>}</div>}
        {results.length > 0 && <footer className={styles.pagination}><p>Hiển thị {(currentPage - 1) * 9 + 1}–{Math.min(currentPage * 9, results.length)} trong {results.length} sản phẩm</p><nav aria-label="Phân trang">{currentPage > 1 && <a href={pageHref(currentPage - 1)} onClick={event => changePage(event, currentPage - 1)} aria-label="Trang trước"><ArrowLeft size={17} /></a>}{Array.from({ length: pages }, (_, i) => i + 1).map(number => <a key={number} href={pageHref(number)} onClick={event => changePage(event, number)} aria-label={`Trang ${number}`} aria-current={number === currentPage ? 'page' : undefined}>{number}</a>)}{currentPage < pages && <a href={pageHref(currentPage + 1)} onClick={event => changePage(event, currentPage + 1)} aria-label="Trang sau"><ArrowRight size={17} /></a>}</nav></footer>}
      </section>
    </div>
    <dialog ref={dialog} className={styles.drawer} aria-labelledby="filter-heading" onCancel={event => { event.preventDefault(); closeDrawer(); }} onClick={event => { if (event.target === dialog.current) closeDrawer(); }}>
      <div className={styles.drawerInner}><header><h2 id="filter-heading">Bộ lọc</h2><button onClick={closeDrawer} aria-label="Đóng bộ lọc"><X size={22} /></button></header><div className={styles.drawerBody}>{draft && <FilterPanel groups={groups} filters={draft} products={catalog} prefix="mobile" onChange={(key, values) => setDraft(current => ({ ...current, [key]: values }))} />}</div><footer><button className={styles.textButton} onClick={() => setDraft({})}>Xóa bộ lọc</button><button className={styles.primary} onClick={() => { update(Object.fromEntries(filterGroups.map(group => [group.id, draft?.[group.id] || []]))); closeDrawer(); }}>Xem {selectProducts(catalog, draft || {}, sort).length} sản phẩm</button></footer></div>
    </dialog>
  </main>;
}
