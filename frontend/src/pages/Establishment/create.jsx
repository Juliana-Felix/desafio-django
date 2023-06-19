import React, { useState } from "react";
import { api } from "../../service/api";
import * as yup from "yup";
import Alert from "../../templates/validacao/templateValidacaoForms"; // Importe o componente Alert aqui

const CreateEstablishmentModal = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;

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

  async function validate() {
    let schema = yup.object().shape({
      name: yup.string().required("Erro: Necessário preencher o campo nome!"),
      address: yup
        .string()
        .required("Erro: Necessário preencher o campo endereço!"),
      phone: yup.string().required("Erro: Necessário preencher o campo telefone!"),
      businessType: yup
        .string()
        .required("Erro: Necessário preencher o campo tipo de negócio!"),
      emailAddress: yup
        .string()
        .email("Erro: Endereço de e-mail inválido!")
        .required("Erro: Necessário preencher o campo endereço de e-mail!"),
      state: yup.string().required("Erro: Necessário preencher o campo estado!"),
      category: yup.string().required("Erro: Necessário preencher o campo categoria!"),
    });

    try {
      await schema.validate({
        name,
        address,
        phone,
        businessType,
        emailAddress,
        state,
        category,
      });
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

              {status.type && (
                <Alert type={status.type} message={status.message} />
              )}

              <button
                className="bg-violet-500 text-white px-4 py-2 w-full rounded-lg font-semibold"
                type="submit"
              >
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
