import { useState } from "react";

import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    
    {
      NamaBarang: "sepatu basket",
      Alamat: "Kec. Rawalumbu, Kota Bks, Jawa Barat",
      NomerTelp:"000000000",
      Penerima: "rizki",
      status: "diterima",
    },
    {
      NamaBarang: "baju bola",
      Alamat: "Kec. Ciputat Tim., Kota Tangerang Selatan",
      NomerTelp:"11111111111",
      Penerima: "yahya",
      status: "proses",
    },
    {
      NamaBarang: "topi",
      Alamat: "Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
      NomerTelp:"22222222222",
      Penerima: "adi",
      status: "batal",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;
