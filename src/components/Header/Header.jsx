import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import styles from "./Header.module.css";
import {
  headerCollections as collections,
  headerNavigationItems as navigationItems,
  productOptionHref,
  productTypes,
} from "../../data/mockData";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [activeCollectionId, setActiveCollectionId] = useState(
    collections[0].id,
  );
  const [activeProductTypeId, setActiveProductTypeId] = useState(
    productTypes[0].id,
  );
  const [mobileProductTypeId, setMobileProductTypeId] = useState(null);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);
  const previewTimer = useRef(null);
  const productCloseTimer = useRef(null);
  const productPreviewTimer = useRef(null);
  const activeCollection =
    collections.find(({ id }) => id === activeCollectionId) ?? collections[0];
  const activeProductType =
    productTypes.find(({ id }) => id === activeProductTypeId) ??
    productTypes[0];

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openCollections = () => {
    cancelClose();
    setIsProductOpen(false);
    setIsCollectionOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setIsCollectionOpen(false),
      280,
    );
  };
  const previewCollection = (id, delayed = true) => {
    window.clearTimeout(previewTimer.current);
    previewTimer.current = window.setTimeout(
      () => setActiveCollectionId(id),
      delayed ? 140 : 0,
    );
  };
  const cancelProductClose = () =>
    window.clearTimeout(productCloseTimer.current);
  const openProducts = () => {
    cancelProductClose();
    setIsCollectionOpen(false);
    setIsProductOpen(true);
  };
  const scheduleProductClose = () => {
    cancelProductClose();
    productCloseTimer.current = window.setTimeout(
      () => setIsProductOpen(false),
      280,
    );
  };
  const previewProductType = (id, delayed = true) => {
    window.clearTimeout(productPreviewTimer.current);
    productPreviewTimer.current = window.setTimeout(
      () => setActiveProductTypeId(id),
      delayed ? 130 : 0,
    );
  };

  useEffect(() => {
    const closeOnOutsidePointer = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsCollectionOpen(false);
        setIsProductOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsCollectionOpen(false);
        setIsProductOpen(false);
        if (headerRef.current?.contains(document.activeElement))
          document.activeElement?.blur();
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(previewTimer.current);
      window.clearTimeout(productCloseTimer.current);
      window.clearTimeout(productPreviewTimer.current);
    };
  }, []);

  return (
    <header className={styles.header} ref={headerRef}>
      <a className={styles.skipLink} href="#main-content">
        Đi đến nội dung chính
      </a>
      <div className={styles.announcement}>
        Miễn phí giao hàng cho đơn từ 1.500.000đ
      </div>
      <div className={`${styles.main} shell`}>
        <label className={styles.search}>
          <span className={styles.srOnly}>Tìm kiếm sản phẩm</span>
          <Search size={18} aria-hidden="true" />
          <input placeholder="Tìm chăn, ga, gối..." type="search" />
        </label>
        <a className={styles.brand} href="/" aria-label="Trang chủ Everon">
          EVERON
        </a>
        <div className={styles.actions}>
          <button type="button" aria-label="Tài khoản">
            <UserRound size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Giỏ hàng" className={styles.cart}>
            <ShoppingBag size={20} aria-hidden="true" />
            <span>0</span>
          </button>
          <button
            className={styles.menuButton}
            type="button"
            onClick={() => {
              setIsMenuOpen((current) => !current);
              setIsCollectionOpen(false);
              setIsProductOpen(false);
              setMobileProductTypeId(null);
            }}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="primary-navigation"
        className={`${styles.navigation} ${isMenuOpen ? styles.open : ""}`}
        aria-label="Điều hướng chính"
      >
        <div
          className={styles.collectionNav}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") openCollections();
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") scheduleClose();
          }}
          onFocus={openCollections}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              scheduleClose();
          }}
        >
          <button
            id="collection-menu-trigger"
            className={`${styles.collectionTrigger} ${isCollectionOpen ? styles.triggerActive : ""}`}
            type="button"
            aria-expanded={isCollectionOpen}
            aria-controls="collection-mega-menu"
            onClick={openCollections}
          >
            Bộ sưu tập{" "}
            <ChevronDown size={14} strokeWidth={1.7} aria-hidden="true" />
          </button>
          <div
            id="collection-mega-menu"
            className={`${styles.megaMenu} ${isCollectionOpen ? styles.megaMenuOpen : ""}`}
            onPointerEnter={cancelClose}
            onPointerLeave={scheduleClose}
          >
            <div className={`${styles.megaMenuInner} shell`}>
              <div className={styles.collectionPanel}>
                <p>Bộ sưu tập</p>
                <div className={styles.collectionLinks}>
                  {collections.map((collection) => {
                    const isActive = collection.id === activeCollectionId;
                    return (
                      <a
                        className={isActive ? styles.collectionActive : ""}
                        href={collection.href}
                        key={collection.id}
                        onPointerEnter={() => previewCollection(collection.id)}
                        onFocus={() => previewCollection(collection.id, false)}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span>
                          <strong>{collection.name}</strong>
                          <small>{collection.note}</small>
                        </span>
                        <ArrowRight
                          size={18}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className={styles.previewPanel}>
                <header className={styles.previewHeader}>
                  <div>
                    <small>Sản phẩm nổi bật</small>
                    <h2>{activeCollection.name}</h2>
                  </div>
                  <a href={activeCollection.href}>
                    Xem tất cả{" "}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </header>
                <div
                  className={styles.products}
                  key={activeCollection.id}
                  aria-live="polite"
                >
                  {activeCollection.products.map((product) => (
                    <a
                      className={styles.product}
                      href={`/products/${product.id}`}
                      key={product.id}
                    >
                      <span className={styles.productImage}>
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                      </span>
                      <strong>{product.name}</strong>
                      <small>{product.price}</small>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.mobileCollections} ${isCollectionOpen ? styles.mobileCollectionsOpen : ""}`}
          >
            {collections.map((collection) => (
              <a
                href={collection.href}
                key={collection.id}
                onClick={() => setIsMenuOpen(false)}
              >
                {collection.name}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div
          className={styles.productNav}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") openProducts();
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") scheduleProductClose();
          }}
          onFocus={() => {
            if (!window.matchMedia("(max-width: 800px)").matches)
              openProducts();
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              scheduleProductClose();
          }}
        >
          <button
            id="product-menu-trigger"
            className={`${styles.collectionTrigger} ${isProductOpen ? styles.triggerActive : ""}`}
            type="button"
            aria-expanded={isProductOpen}
            aria-controls="product-mega-menu"
            onClick={() => {
              if (window.matchMedia("(max-width: 800px)").matches)
                setIsProductOpen((current) => !current);
              else openProducts();
            }}
          >
            Sản phẩm{" "}
            <ChevronDown size={14} strokeWidth={1.7} aria-hidden="true" />
          </button>
          <div
            id="product-mega-menu"
            className={`${styles.megaMenu} ${styles.productMegaMenu} ${isProductOpen ? styles.megaMenuOpen : ""}`}
            onPointerEnter={cancelProductClose}
            onPointerLeave={scheduleProductClose}
          >
            <div className={`${styles.productMenuInner} shell`}>
              <section
                className={styles.productTypePanel}
                aria-label="Loại sản phẩm"
              >
                <p>Loại sản phẩm</p>
                <div
                  className={styles.productTypeList}
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {productTypes.map((productType) => {
                    const Icon = productType.icon;
                    const isActive = productType.id === activeProductTypeId;
                    return (
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="product-filter-panel"
                        className={isActive ? styles.productTypeActive : ""}
                        key={productType.id}
                        onPointerEnter={() =>
                          previewProductType(productType.id)
                        }
                        onFocus={() =>
                          previewProductType(productType.id, false)
                        }
                        onClick={() =>
                          window.location.assign(productType.href)
                        }
                      >
                        <Icon size={21} strokeWidth={1.55} aria-hidden="true" />
                        <span>{productType.name}</span>
                        <ArrowRight
                          size={17}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
              <section
                id="product-filter-panel"
                className={styles.filterPanel}
                role="tabpanel"
                aria-label={`Danh mục ${activeProductType.name}`}
              >
                <header className={styles.filterHeader}>
                  <div>
                    <small>Khám phá theo</small>
                    <h2>{activeProductType.name}</h2>
                  </div>
                  <a href={activeProductType.href}>
                    Xem tất cả{" "}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </a>
                </header>
                <div
                  className={styles.filterGroups}
                  key={activeProductType.id}
                  aria-live="polite"
                >
                  {activeProductType.groups.map((group) => (
                    <div className={styles.filterGroup} key={group.id}>
                      <h3>{group.title}</h3>
                      <div>
                        {group.options.map(([label, query]) => (
                          <a
                            href={productOptionHref(activeProductType, query)}
                            key={query}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div
            className={`${styles.mobileProducts} ${isProductOpen ? styles.mobileProductsOpen : ""}`}
          >
            {mobileProductTypeId && (
              <button
                className={styles.mobileBack}
                type="button"
                onClick={() => setMobileProductTypeId(null)}
              >
                <ArrowLeft size={17} aria-hidden="true" /> Sản phẩm
              </button>
            )}
            {!mobileProductTypeId
              ? productTypes.map((productType) => (
                  <button
                    type="button"
                    key={productType.id}
                    onClick={() => setMobileProductTypeId(productType.id)}
                  >
                    {productType.name}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ))
              : productTypes
                  .find(({ id }) => id === mobileProductTypeId)
                  ?.groups.map((group) => (
                    <details key={group.id}>
                      <summary>
                        {group.title}
                        <ChevronDown size={16} aria-hidden="true" />
                      </summary>
                      <div>
                        {group.options.map(([label, query]) => (
                          <a
                            href={productOptionHref(
                              productTypes.find(
                                ({ id }) => id === mobileProductTypeId,
                              ),
                              query,
                            )}
                            key={query}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    </details>
                  ))}
          </div>
        </div>
        {navigationItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
