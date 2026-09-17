import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Heart, Maximize2, Minus, Plus, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { filterGroups, formatPrice, products } from "../ProductListing/catalog";

import styles from "./ProductDetail.module.css";

const sizeOptions = filterGroups.find((group) => group.id === "size").options;
const labelFor = (group, value) =>
  group.find((option) => option.value === value)?.label || value;

export default function ProductDetail({ id }) {
  const product = products.find((item) => item.id === id);
  const auth = useAuth();
  const cart = useCart();
  const wishlist = useWishlist();
  const dialogRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [validation, setValidation] = useState("");
  const [notice, setNotice] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const ids = JSON.parse(
        localStorage.getItem("everon-recently-viewed") || "[]",
      );
      return Array.isArray(ids)
        ? ids.filter((productId) => productId !== id)
        : [];
    } catch {
      return [];
    }
  });

  const gallery = useMemo(
    () =>
      product
        ? [
            {
              src: product.image,
              srcSet: product.imageSet,
              position: "center",
            },
            {
              src: product.image,
              srcSet: product.imageSet,
              position: "30% center",
            },
            {
              src: product.image,
              srcSet: product.imageSet,
              position: "75% center",
            },
          ]
        : [],
    [product],
  );
  const viewedProducts = useMemo(
    () =>
      recentlyViewed
        .map((productId) => products.find((item) => item.id === productId))
        .filter(Boolean)
        .slice(0, 10),
    [recentlyViewed],
  );

  useEffect(() => {
    if (!product) return;
    const oldTitle = document.title;
    document.title = `${product.name} | Everon Thủ Đức`;
    return () => {
      document.title = oldTitle;
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    try {
      const stored = JSON.parse(
        localStorage.getItem("everon-recently-viewed") || "[]",
      );
      const previous = Array.isArray(stored) ? stored : [];
      setRecentlyViewed(
        previous.filter((productId) => productId !== product.id),
      );
      localStorage.setItem(
        "everon-recently-viewed",
        JSON.stringify(
          [
            product.id,
            ...previous.filter((productId) => productId !== product.id),
          ].slice(0, 10),
        ),
      );
    } catch {
      setRecentlyViewed([]);
    }
  }, [product]);

  if (!product)
    return (
      <main id="main-content" className={`${styles.notFound} shell`}>
        <p className="eyebrow">Everon</p>
        <h1>Không tìm thấy sản phẩm</h1>
        <a href="/products">Trở lại danh sách sản phẩm</a>
      </main>
    );

  const availableSizes = [...new Set(product.size)];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const favorite = wishlist.has(product.id);
  const addToCart = () => {
    if (!selectedSize) {
      setValidation("Vui lòng chọn kích thước.");
      return;
    }
    cart.add(product, { size: selectedSize }, quantity);
    setValidation("");
    setNotice("Đã thêm sản phẩm vào giỏ hàng.");
    window.setTimeout(() => setNotice(""), 3500);
  };
  const toggleWishlist = () => {
    if (!auth.user) {
      sessionStorage.setItem("everon_auth_return", window.location.pathname);
      sessionStorage.setItem("everon_wishlist_intent", product.id);
      window.location.assign("/login");
      return;
    }
    wishlist.toggle(product.id);
  };
  return (
    <main id="main-content" className={styles.page}>
      <div className="shell">
        <nav aria-label="Đường dẫn" className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/products">Sản phẩm</a>
          <span>/</span>
          <a href="/products?type=bedding">Chăn ga gối</a>
          <span>/</span>
          <a href="/products?type=bedding&category=duvet">Chăn và vỏ chăn</a>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.leftColumn}>
            <div className={styles.gallery}>
              <div className={styles.mainVisual}>
                <button
                  type="button"
                  onClick={() => dialogRef.current?.showModal()}
                  aria-label="Mở ảnh sản phẩm toàn màn hình"
                >
                  <img
                    src={gallery[activeImage].src}
                    srcSet={gallery[activeImage].srcSet}
                    sizes="(max-width: 800px) 100vw, 58vw"
                    alt={`${product.name}, ảnh ${activeImage + 1}`}
                    style={{ objectPosition: gallery[activeImage].position }}
                    width="800"
                    height="600"
                  />
                  <span>
                    <Maximize2 size={17} aria-hidden="true" /> Xem lớn
                  </span>
                </button>
              </div>
              <div className={styles.thumbnails} aria-label="Ảnh sản phẩm">
                {gallery.map((image, index) => (
                  <button
                    key={image.position}
                    type="button"
                    className={index === activeImage ? styles.activeThumb : ""}
                    aria-label={`Xem ảnh ${index + 1}`}
                    aria-pressed={index === activeImage}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image.src}
                      alt=""
                      style={{ objectPosition: image.position }}
                      width="140"
                      height="105"
                    />
                  </button>
                ))}
              </div>
            </div>
            {product.descriptionHtml && (
              <section
                className={styles.editorialSection}
                aria-labelledby="description-title"
              >
                <h2 id="description-title">Mô tả sản phẩm</h2>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </section>
            )}
          </div>
          <section className={styles.purchase} aria-labelledby="product-title">
            <h1 id="product-title">{product.name}</h1>
            <p className={styles.sku}>Mã sản phẩm: {product.code}</p>
            <div className={styles.price}>
              <strong>{formatPrice(product.price)}</strong>
              {product.originalPrice && (
                <del>{formatPrice(product.originalPrice)}</del>
              )}
              {discount > 0 && <span>Giảm {discount}%</span>}
            </div>
            <fieldset className={styles.variants}>
              <legend>Kích thước </legend>
              <div>
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={selectedSize === size}
                    onClick={() => {
                      setSelectedSize(size);
                      setValidation("");
                    }}
                  >
                    {labelFor(sizeOptions, size)}
                  </button>
                ))}
              </div>
              {validation && <p role="alert">{validation}</p>}
            </fieldset>
            <div className={styles.purchaseActions}>
              <div className={styles.quantity}>
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                >
                  <Minus size={16} />
                </button>
                <output aria-live="polite">{quantity}</output>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                className={styles.addButton}
                disabled={!product.inStock}
                onClick={addToCart}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                className={styles.wishlist}
                aria-label={
                  favorite
                    ? "Bỏ khỏi danh sách yêu thích"
                    : "Thêm vào danh sách yêu thích"
                }
                title={favorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
                aria-pressed={favorite}
                onClick={toggleWishlist}
              >
                <Heart
                  size={20}
                  fill={favorite ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            </div>
            {product.specificationsHtml && (
              <section
                className={styles.purchaseSpecs}
                aria-labelledby="purchase-specifications-title"
              >
                <h2 id="purchase-specifications-title">Thông tin chi tiết</h2>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={{
                    __html: product.specificationsHtml,
                  }}
                />
              </section>
            )}
          </section>
        </section>
      </div>
      {viewedProducts.length > 0 && (
        <section className={`${styles.recentlyViewed} shell`}>
          <header>
            <p className="eyebrow">Lịch sử khám phá</p>
            <h2>Sản phẩm đã xem</h2>
          </header>
          <div className={styles.recentTrack}>
            {viewedProducts.map((item) => (
              <a
                href={`/products/${item.id}`}
                className={styles.recentCard}
                key={item.id}
              >
                <span>
                  <img
                    src={item.image}
                    srcSet={item.imageSet}
                    sizes="(max-width: 760px) 58vw, 25vw"
                    alt={item.name}
                    width="640"
                    height="480"
                    loading="lazy"
                  />
                </span>
                <h3>{item.name}</h3>
                <strong>{formatPrice(item.price)}</strong>
              </a>
            ))}
          </div>
        </section>
      )}
      <div className={styles.mobileBar}>
        <div>
          <small>Tổng giá</small>
          <strong>{formatPrice(product.price * quantity)}</strong>
        </div>
        <button type="button" disabled={!product.inStock} onClick={addToCart}>
          Thêm vào giỏ
        </button>
      </div>
      {notice && (
        <div className={styles.toast} role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClick={(event) =>
          event.target === dialogRef.current && dialogRef.current.close()
        }
      >
        <button
          type="button"
          aria-label="Đóng ảnh toàn màn hình"
          onClick={() => dialogRef.current.close()}
        >
          <X size={24} />
        </button>
        <img
          src={gallery[activeImage].src}
          alt={`${product.name}, ảnh phóng lớn`}
          style={{ objectPosition: gallery[activeImage].position }}
        />
      </dialog>
    </main>
  );
}
