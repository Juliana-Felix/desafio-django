import React, { useState } from "react";
import * as yup from "yup";
import TemplateFormUser from "../../templates/templateFormUser";
import { api } from "../../service/api";
import estabelecimento from "../../assets/estabelecimento.png";
import eyeOpen from "../../assets/abrir-o-olho.png";
import eyeClosed from "../../assets/fechar-o-olho.png";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../../redux/store";
import Alert from "../../templates/validacao/templateValidacaoForms";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: username,
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validate()) {
      try {
        const res = await api.post("api/api/login/", { ...formData });

        dispatch(setUsername(formData.username));

        localStorage.setItem("username", formData.username);

        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      name: yup.string().required("Erro: Necessário preencher o campo nome!"),
      username: yup
        .string()
        .required("Erro: Necessário preencher o campo usuário!"),
      email: yup
        .string()
        .email("Erro: Insira um e-mail válido!")
        .required("Erro: Necessário preencher o campo e-mail!"),
      password: yup.string().required("Erro: Necessário preencher o campo senha!"),
    });

    try {
      await schema.validate(formData);
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
    <>
      <div>
        {status.type && (
          <Alert type={status.type} message={status.message} />
        )}
      </div>
      <TemplateFormUser>
        <div
          title="Gerencie seus estabelecimentos e lojas de forma simples e eficiente"
          image={<img src={estabelecimento} alt="estabelecimento" />}
          form={
            <form className="w-full mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-dark-gray font-semibold mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  className="border border-light-green w-full rounded-lg text-green-950 text-xl p-4"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="text-dark-gray font-semibold mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  className="border border-light-green w-full rounded-lg text-green-950 text-xl p-4"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="text-dark-gray font-semibold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="border border-light-green w-full rounded-lg text-green-950 text-xl p-4"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-dark-gray font-semibold mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="border border-light-green w-full rounded-lg text-xl p-4"
                    id="cast"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div onClick={toggleShowPassword} className="absolute w-5 right-3 top-1/3 cursor-pointer">
                    {showPassword ? <img src={eyeOpen} alt="show_password" /> : <img src={eyeClosed} alt="hide_password" />}
                  </div>
                </div>
                <button className="font-semibold text-white bg-green-500 rounded-lg py-4 mt-4 w-full">
                  Entrar
                </button>
              </div>
            </form>
          }
        />
      </TemplateFormUser>
    </>
  );
}
