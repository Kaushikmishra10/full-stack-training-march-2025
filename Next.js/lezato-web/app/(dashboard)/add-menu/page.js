"use client";

import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import MenuData from "@/data/MenuData";
import styles from "@/styles/scss/theme/add-menu.module.css";

const categoryOptions = [
  { id: 1, label: "Main Course" },
  { id: 2, label: "Dessert" },
  { id: 3, label: "Drinks" }, 
  { id: 5, label: "Pizza" },
  { id: 6, label: "Burger" },
  { id: 7, label: "Pasta" },
  { id: 9, label: "Seafood" },
];

const statusOptions = ["ACTIVE", "INACTIVE"];

export default function AddMenuPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: "",
    rating: 0,
    reviews: 0,
    status: "ACTIVE",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Item name is required";
    if (!form.categoryId) newErrors.categoryId = "Please select a category";
    if (!form.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(parseFloat(form.price.replace("$", "")))) newErrors.price = "Enter a valid price";
    if (!form.rating) newErrors.rating = "Please select a rating";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Format price
    const priceStr = form.price.startsWith("$")
      ? form.price.trim()
      : `$${parseFloat(form.price).toFixed(2)}`;

    // New item
    const newItem = {
      id: MenuData.length + 1,
      name: form.name.trim(),
      categoryId: parseInt(form.categoryId),
      price: priceStr,
      rating: parseInt(form.rating),
      reviews: 0,
      status: form.status,
    };

    MenuData.push(newItem);

    setSuccess(true);

    setTimeout(() => {
      router.push("/menu");
    }, 1500);
  };

  const handleReset = () => {
    setForm({ name: "", categoryId: "", price: "", rating: 0, reviews: 0, status: "ACTIVE" });
    setErrors({});
    setSuccess(false);
  };

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className={styles.pageTitle}>Add Menu Item</h4>
          <p className={styles.pageSub}>Fill in the details to add a new item to the menu list</p>
        </div>
        <span className={styles.breadcrumb}>Menu / Add Menu</span>
      </div>

      {/* ── Success Banner ── */}
      {success && (
        <div className={styles.successBanner}>
          <span className={styles.successIcon}>✓</span>
          <span>Item added successfully! Redirecting to Menu List...</span>
        </div>
      )}

      <Row className="g-4">

        {/* ── Left — Main Form ── */}
        <Col lg={8}>
          <div className={styles.card}>
            <p className={styles.sectionTitle}>Item Information</p>

            {/* Item Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Item Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Spicy Chicken Burger"
                className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>

            {/* Category + Status */}
            <Row className="g-3">
              <Col md={6}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className={`${styles.select} ${errors.categoryId ? styles.inputError : ""}`}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.categoryId && <span className={styles.errorMsg}>{errors.categoryId}</span>}
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <div className="d-flex gap-3 mt-2">
                    {statusOptions.map((s) => (
                      <label key={s} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          checked={form.status === s}
                          onChange={handleChange}
                          className={styles.radioInput}
                        />
                        <span className={`${styles.radioChip} ${form.status === s ? styles.radioChipActive : ""}`}>
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Price */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Price <span className={styles.required}>*</span>
              </label>
              <div className={styles.priceInputWrap}>
                <span className={styles.pricePre}>$</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`${styles.priceInput} ${errors.price ? styles.inputError : ""}`}
                />
              </div>
              {errors.price && <span className={styles.errorMsg}>{errors.price}</span>}
            </div>

            {/* Rating */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Rating <span className={styles.required}>*</span>
              </label>
              <div className="d-flex align-items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={styles.starBtn}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setForm((prev) => ({ ...prev, rating: star }));
                      setErrors((prev) => ({ ...prev, rating: "" }));
                    }}
                  >
                    <span className={
                      star <= (hoverRating || form.rating)
                        ? styles.starFilled
                        : styles.starEmpty
                    }>
                      ★
                    </span>
                  </button>
                ))}
                {form.rating > 0 && (
                  <span className={styles.ratingText}>{form.rating} / 5</span>
                )}
              </div>
              {errors.rating && <span className={styles.errorMsg}>{errors.rating}</span>}
            </div>

            {/* Description (optional, UI only) */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Description <span className={styles.optional}>(Optional)</span>
              </label>
              <textarea
                placeholder="Write a short description of this menu item..."
                className={styles.textarea}
                rows={4}
              />
            </div>
          </div>
        </Col>

        {/* ── Right — Preview + Actions ── */}
        <Col lg={4}>

          {/* Preview Card */}
          <div className={`${styles.card} mb-4`}>
            <p className={styles.sectionTitle}>Live Preview</p>
            <div className={styles.previewBox}>
              <div className={styles.previewImgPlaceholder}>
                <span className={styles.previewImgIcon}>🍽️</span>
              </div>
              <p className={styles.previewName}>
                {form.name || <span className={styles.previewPlaceholder}>Item name will appear here</span>}
              </p>
              <div className="d-flex align-items-center justify-content-between mt-2">
                {form.categoryId ? (
                  <span className={styles.previewCategory}>
                    {categoryOptions.find((c) => c.id === parseInt(form.categoryId))?.label}
                  </span>
                ) : (
                  <span className={styles.previewPlaceholder}>No category</span>
                )}
                <span className={styles.previewPrice}>
                  {form.price ? `$${parseFloat(form.price || 0).toFixed(2)}` : "$ --"}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div className="d-flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= form.rating ? styles.starFilled : styles.starEmpty}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={`${styles.previewStatus} ${form.status === "ACTIVE" ? styles.statusActive : styles.statusInactive}`}>
                  {form.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.card}>
            <p className={styles.sectionTitle}>Actions</p>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={success}
            >
              {success ? "✓ Added!" : "+ Add to Menu List"}
            </button>
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset Form
            </button>
            <button className={styles.cancelBtn} onClick={() => router.push("/menu")}>
              Cancel
            </button>
          </div>

        </Col>
      </Row>
    </div>
  );
}