import { useState } from "react";
import TemplateFormUser from "../../templates/templateFormUser";
import { api } from "../../service/api";
import estabelecimento from "../../assets/estabelecimento.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../../redux/store";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);

  const [formData, setFormData] = useState({
    name: username,
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("api/api/login/", { ...formData });

      dispatch(setUsername(formData.username));

      localStorage.setItem("username", formData.username);

      navigate("/");
    } catch (err) {

      console.log(err);
    }
  };

  return (
    <>
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
                <input
                  className="border border-light-green w-full rounded-lg text-green-950 text-xl p-4"
                  id="cast"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
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
