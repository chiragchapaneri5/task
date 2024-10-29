import React, { useEffect, useState } from "react";

export default function DeleteModal({
  isOpen,
  onClose,
  children,
  apiData,
  setModalOpen,
  // submitForm,
  setCurrentId,
  setCurrentPage,
  currentPage,
  product,
  setProduct,
  setRowsToShow,
}) {
  if (!isOpen) return null;

  const deleteData = () => {
    const updateData = product.filter((data) => data.id !== apiData.id);
    setProduct(updateData);
    const rowsToShow = updateData.slice((currentPage - 1) * 5, currentPage * 5);
    if (rowsToShow.length == 0) {
      setCurrentPage(currentPage - 1);

      console.log(
        updateData.slice(
          (currentPage - currentPage == 1 ? 1 : 2) * 5,
          currentPage == 1 ? currentPage : currentPage - 2 * 5
        )
      );
    } else {
      setRowsToShow(updateData.slice((currentPage - 1) * 5, currentPage * 5));
    }
  };

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
        <h2>Are you sure you want to delete data</h2>
        <button
          onClick={() => deleteData()}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "red",
            color: "white",
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}
