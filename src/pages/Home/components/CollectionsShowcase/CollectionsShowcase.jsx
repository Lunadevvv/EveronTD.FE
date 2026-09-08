import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import styles from "./CollectionsShowcase.module.css";
import { showcaseCollections as collections } from "../../../../data/mockData";
export default function CollectionsShowcase() {
  const [activeId, setActiveId] = useState(collections[0].id);
  const tabRefs = useRef([]);
  const activeCollection =
    collections.find(({ id }) => id === activeId) ?? collections[0];

  const selectAdjacentCollection = (event, currentIndex) => {
    const offsets = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault();
    const nextIndex =
      (currentIndex + offset + collections.length) % collections.length;
    setActiveId(collections[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      className={`${styles.section} shell reveal`}
      aria-labelledby="collections-title"
    >
      <div className={styles.navigation}>
        <p className="eyebrow">Bộ sưu tập chọn lọc</p>
        <h2 id="collections-title">Bộ sưu tập</h2>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Chọn bộ sưu tập"
        >
          {collections.map((collection, index) => {
            const isActive = collection.id === activeId;
            return (
              <button
                className={`${styles.tab} ${isActive ? styles.active : ""}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="collection-products"
                tabIndex={isActive ? 0 : -1}
                key={collection.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                style={{ "--collection-banner": `url("${collection.banner}")` }}
                onClick={() => setActiveId(collection.id)}
                onKeyDown={(event) => selectAdjacentCollection(event, index)}
              >
                <span className={styles.tabCopy}>
                  <strong>{collection.name}</strong>
                  <small>{collection.note}</small>
                </span>
                <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.contentHeader}>
          <div>
            <p>Sản phẩm nổi bật</p>
            <h3>{activeCollection.name}</h3>
          </div>
          <a href={`/collections/${activeCollection.id}`}>
            Xem tất cả{" "}
            <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </header>
        <div
          className={styles.products}
          id="collection-products"
          role="tabpanel"
          aria-live="polite"
          key={activeCollection.id}
        >
          {activeCollection.products.map((product) => (
            <a
              className={styles.product}
              href={`/products/${product.id}`}
              key={product.id}
            >
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <h4>{product.name}</h4>
              <p>{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
