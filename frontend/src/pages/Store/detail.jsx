import React, { useState } from "react";
import { api } from "../../service/api";
import trash_image from "../../assets/lixo.png";

const DetailStore = ({ store }) => {
  const [editedStore, setEditedStore] = useState(store);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStore((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      console.log(store.id)
      const response = await api.put(`api/store/${editedStore.id}/`, editedStore);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRegister = async () => {
    try {
      const response = await api.delete(`api/store/${editedStore.id}/`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          <input
            type="text"
            name="name"
            value={editedStore.name}
            onChange={handleInputChange}
            className="w-full border-0 focus:ring-0 focus:border-gray-300 bg-transparent text-xl font-semibold"
            disabled={isSaving}
          />
        </h2>
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-white ${isSaving ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-700"
            }`}
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </button>
        <button
          className={`flex ml-1 px-4 py-2 rounded-lg font-semibold text-white ${isSaving ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
            }`}
          onClick={deleteRegister}
          disabled={isSaving}
        >
          Deletar
          <img src={trash_image} alt="delete_establishment" className="w-6" />
        </button>
      </div>
      <p className="mb-4">
        <span className="font-semibold">Descrição:</span>{" "}
        <input
          type="text"
          name="description"
          value={editedStore.description}
          onChange={handleInputChange}
          className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0 bg-transparent w-full"
          disabled={isSaving}
        />
      </p>
      <p className="mb-4">
        <span className="font-semibold">Serviço:</span>{" "}
        <input
          type="text"
          name="service"
          value={editedStore.service}
          onChange={handleInputChange}
          className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0 bg-transparent w-full"
          disabled={isSaving}
        />
      </p>
    </div>
  );
};

export default DetailStore;
