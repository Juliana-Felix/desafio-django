import React, { useState } from "react";
import { api } from "../../service/api";
import * as yup from "yup";
import Alert from "../../templates/validacao/templateValidacaoForms";

export default function CreateStoreModal({ isOpen, closeModal, establishment }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;

    try {
      const formData = {
        name,
        description,
        service,
        cod_establishment: establishment,
      };

      const response = await api.post("api/store/", formData);

      setName("");
      setDescription("");
      setService("");

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      name: yup.string().required("Erro: Necessário preencher o campo nome!"),
      description: yup
        .string()
        .required("Erro: Necessário preencher o campo descrição!"),
      service: yup.string().required("Erro: Necessário preencher o campo serviço!"),
    });

    try {
      await schema.validate({ name, description, service });
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
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {status.type && <Alert type={status.type} message={status.message} />}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  className="w-full form-control border border-gray-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="description">Descrição:</label>
                <input
                  type="text"
                  id="description"
                  className="form-control mt-2 border border-gray-300 w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="service">Serviço:</label>
                <input
                  type="text"
                  id="service"
                  className="form-control mt-2 border border-gray-300 w-full"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              <div className="hidden">
                <label htmlFor="cod_establishment">Estabelecimento:</label>
                <input
                  type="text"
                  id="cod_establishment"
                  className="form-control mt-2 w-full border border-gray-300 mb-7"
                  value={establishment}
                />
              </div>
              <button className="bg-violet-500 text-white px-4 py-2 w-full rounded-lg font-semibold mt-4">
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
