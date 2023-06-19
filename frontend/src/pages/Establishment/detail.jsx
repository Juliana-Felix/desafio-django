import React, { useState } from "react";
import { api } from "../../service/api";
import * as yup from "yup";
import Alert from "../../templates/validacao/templateValidacaoForms";
import trash_image from "../../assets/lixo.png";
import arrow_image from "../../assets/seta-direita.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEstablishmentId } from "../../redux/store";

const DetailEstablishment = ({ establishment }) => {
  const [editedEstablishment, setEditedEstablishment] = useState(establishment);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const establishmentID = useSelector((state) => state.establishmentID);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEstablishment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!(await validate())) return;

    try {
      setIsSaving(true);
      const response = await api.put(
        `api/home/${editedEstablishment.id}/`,
        editedEstablishment
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePage = async (e) => {
    e.preventDefault();
    try {
      dispatch(setEstablishmentId(editedEstablishment.id));
      console.log(editedEstablishment);
      navigate("/stores");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegister = async () => {
    try {
      const response = await api.delete(
        `api/home/${editedEstablishment.id}/`
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      name: yup.string().required("Erro: Necessário preencher o campo nome!"),
      category: yup
        .string()
        .required("Erro: Necessário preencher o campo categoria!"),
      address: yup
        .string()
        .required("Erro: Necessário preencher o campo endereço!"),
      state: yup.string().required("Erro: Necessário preencher o campo estado!"),
    });

    try {
      await schema.validate(editedEstablishment);
      setStatus({
        type: "success",
        message: "Validação bem-sucedida!",
      });
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          <input
            type="text"
            name="name"
            value={editedEstablishment.name}
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
        <span className="font-semibold">Categoria:</span>{" "}
        <input
          type="text"
          name="category"
          value={editedEstablishment.category}
          onChange={handleInputChange}
          className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0 bg-transparent w-full"
          disabled={isSaving}
        />
      </p>
      <p className="mb-4">
        <span className="font-semibold">Endereço:</span>{" "}
        <input
          type="text"
          name="address"
          value={editedEstablishment.address}
          onChange={handleInputChange}
          className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0 bg-transparent w-full"
          disabled={isSaving}
        />
      </p>
      <p className="mb-4">
        <span className="font-semibold">Estado:</span>{" "}
        <input
          type="text"
          name="state"
          value={editedEstablishment.state}
          onChange={handleInputChange}
          className="border-b border-gray-300 focus:border-indigo-500 focus:ring-0 bg-transparent w-full"
          disabled={isSaving}
        />
      </p>
      <span className="relative left-2/3 flex cursor-pointer" onClick={handlePage}>
        Visualizar Lojas
        <img className="w-4 ml-1" src={arrow_image} alt="go_to_stores" />
      </span>
      {status.type && (
        <Alert type={status.type} message={status.message} />
      )}
    </div>
  );
};

export default DetailEstablishment;
