import React, { useEffect, useState } from "react";
import { api } from "../../service/api";


const CreateEstablishmentModal = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("api/home/", {
        name,
        address,
        phone,
        business_type: businessType,
        email_address: emailAddress,
        state,
        category,
      });

      setName("");
      setAddress("");
      setPhone("");
      setBusinessType("");
      setEmailAddress("");
      setState("");
      setCategory("");

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""} `}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  className=" w-full form-control  border border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="address">Endereço:</label>
                <input
                  type="text"
                  id="address"
                  className="form-control mt-2 border border-gray-300 w-full"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefone:</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control mt-2 border border-gray-300 w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessType">Tipo de Negócio:</label>
                <input
                  type="text"
                  id="businessType"
                  className="form-control mt-2 w-full border border-gray-300"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Endereço de Email:</label>
                <input
                  type="email"
                  id="emailAddress"
                  className="form-control border mt-2 border-gray-300 w-full"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">Estado:</label>
                <input
                  type="text"
                  id="state"
                  className="form-control border border-gray-300 mt-2 w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Categoria:</label>
                <input
                  type="text"
                  id="category"
                  className="form-control border border-gray-300 mt-2 mb-2 w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <button className={`bg-violet-500 text-white px-4 py-2 w-full rounded-lg font-semibold text-white"`}>
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEstablishmentModal;
