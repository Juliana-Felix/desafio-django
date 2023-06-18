import React, { useState } from "react";
import { api } from "../../service/api";
import * as yup from "yup";


export default function CreateStoreModal({ isOpen, closeModal, establishment }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [cod_establishment, setCodEstablishment] = useState("");

  const [status, setStatus] = useState({
    type: '',
    mensage: ''
  })

  async function validate() {
    let schema = yup.object().shape({
      name: yup
        .string("Erro: Necessário preencher o campo senha!")
        .required("Erro: Necessário preencher o campo senha!")
        .min(6, "A senha tem que ter no mínimo 6 caracters"),
      description: yup
        .string("Erro: Necessário preencher o campo email!")
        .email("Erro: Necessário preencher o campo email!")
        .required("Erro: Necessário preencher o campo email!"),
      service: yup
        .string("Erro: Necessário preencher o campo nome!")
        .required("Erro: Necessário preencher o campo nome!"),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;
    const isValid = await validateForm();

    if (isValid) {
      try {
        const response = await api.post("api/store/", {
          name,
          description,
          service,
          cod_establishment: establishment,
        });

        setName("");
        setDescription("");
        setService("");
        setCodEstablishment("");

        closeModal();
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowError(true);
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      name: yup.string("Erro: Necessário preencher o campo nome!")
        .required("Erro: Necessário preencher o campo nome!")
    });

    try {

    } catch (err) {
      setStatus({
        type: 'error',
        mensagem: 
      })
    }
  }


  return (
    <div className={`modal ${isOpen ? "modal-open" : ""} `}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <ToastContainer />
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
                  value={cod_establishment}
                />
              </div>
              <button className={`bg-violet-500 text-white px-4 py-2 w-full rounded-lg font-semibold mt-4`}>
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
