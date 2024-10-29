import React, { useEffect, useState } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
  apiData,
  setModalOpen,
  // submitForm,
  setCurrentId,
  currentPage,
  product,
  setProduct,
  setRowsToShow,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState({
    title: false,
    body: false,
  });
  const [submitForm, setSubmitForm] = useState(true);

  const checkValidation = (closeModel, formData) => {
    if (!formData?.title || !formData?.body) {
      setSubmitForm(false);
      if (!formData?.title && !formData?.body) {
        setError({
          title: true,
          body: true,
        });
      } else {
        if (!formData?.title)
          setError({
            title: true,
            body: false,
          });
        if (!formData?.body)
          setError({
            title: false,
            body: true,
          });
      }
    } else {
      setSubmitForm(true);
      setError({
        title: false,
        body: false,
      });
      // if (closeModel) {
      //   setModalOpen(false);
      // }
    }
  };

  const changeValue = (e) => {
    const updateData = { ...formData, [e.target.name]: e.target.value };

    setFormData({ ...formData, [e.target.name]: e.target.value });
    checkValidation(false, updateData);
  };

  const submitData = () => {
    checkValidation(true, formData);
    console.log(apiData, "data");
    if (submitForm) {
      const updateData = product.map((data) =>
        data.id === apiData.id ? { ...apiData, ...formData } : data
      );
      console.log(updateData[0]);
      setProduct(updateData);
      setRowsToShow(updateData.slice((currentPage - 1) * 5, 5 * currentPage));
      setModalOpen(false);
      setFormData({});
    } else {
      console.log("no");
    }
  };

  useEffect(() => {
    setFormData({ title: apiData.title, body: apiData.body });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // Close modal when clicking outside the modal box
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal box
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <h2>Edit Form</h2>
        <form>
          <div>
            {error?.title && (
              <div style={{ color: "red" }}> Title is required</div>
            )}

            <label>Title</label>
            <input
              type="text"
              value={formData?.title ? formData.title : apiData?.title}
              onChange={(e) => changeValue(e)}
              name="title"
              // defaultValue={apiData.title}
            />
          </div>

          <div>
            {error?.body && (
              <div style={{ color: "red" }}> body is required</div>
            )}
            <label>body</label>
            <input
              type="text"
              value={formData?.body}
              name="body"
              onChange={(e) => changeValue(e)}
              // defaultValue={apiData.body}
            />
          </div>
        </form>
        <button
          onClick={() => submitData()}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          Submit Data
        </button>
      </div>
    </div>
  );
}
