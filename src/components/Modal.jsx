import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      NamaBarang: "",
      Alamat: "",
      NomerTelp:"",
      Penerima:"",
      status: "diterima",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.NamaBarang && formState.Alamat && formState.NomerTelp && formState.Penerima && formState.status) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="NamaBarang">Nama Barang</label>
            <input 
            name="NamaBarang" 
            onChange={handleChange} 
            value={formState.NamaBarang}
             />
          </div>
          <div className="form-group">
            <label htmlFor="Alamat">Alamat</label>
            <textarea
              name="Alamat"
              onChange={handleChange}
              value={formState.Alamat}
            />
          </div>
          <div className="form-group">
            <label htmlFor="NomerTelp">Nomer Telp</label>
            <input 
            name="NomerTelp" 
            onChange={handleChange} 
            value={formState.NomerTelp}
             />
          </div>
          <div className="form-group">
            <label htmlFor="Penerima">Penerima</label>
            <input 
            name="Penerima" 
            onChange={handleChange} 
            value={formState.Penerima}
             />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="diterima">Diterima</option>
              <option value="proses">Proses</option>
              <option value="batal">Batal</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
