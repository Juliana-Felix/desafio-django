import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import TemplateFormOrganization from "../../templates/templateFormOrganization";
import plus from "../../assets/plus.png";
import arrow_left_image from "../../assets/seta-esquerda.png";
import DetailStore from "./detail";
import CreateStoreModal from "./create";


export default function Store() {
  const [stores, setStores] = useState([]);
  const establishmentID = useSelector((state) => state.establishmentId);
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  const [isOpenForCreate, setIsOpenForCreate] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const navigate = useNavigate()

  const ModalEdit = () => {
    setIsOpenForEdit(!isOpenForEdit);
  };

  const ModalCreate = () => {
    setIsOpenForCreate(!isOpenForCreate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/store/?establishment_id=${establishmentID}}`);
        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [stores]);

  function HandlePage(e) {
    e.preventDefault();

    navigate("/")
  }


  function HandleModal(store) {
    setSelectedStore(store);
    ModalEdit();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4 mr-4">
        <button onClick={HandlePage} className="w-5"><img src={arrow_left_image} alt="go_back" /></button>
        <h1 className="text-2xl font-bold">Lojas dos estabelecimentos</h1>
        <button className="w-10" onClick={ModalCreate} >
          <img src={plus} alt="criar_loja" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {stores.map((store) => (
          <div key={store.id} className="bg-gradient-to-r from-indigo-100 to-violet-50 p-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{store.name}</h2>
            <p className="text-gray-600">{store.description}</p>
            <footer>
              <div>
                <p className="text-gray-600 pr-1">{store.service},</p>
                <button onClick={() => HandleModal(store)} className="bg-violet-500 mt-4 rounded-md px-4 py-2 text-white hover:bg-violet-700 transition-colors">
                  Saiba mais
                </button>
              </div>
            </footer>
          </div>
        ))}
      </div>
      {isOpenForEdit && (
        <TemplateFormOrganization
          isOpen={isOpenForEdit}
          closeModal={ModalEdit}
          title="Dados da loja"
          content={<DetailStore store={selectedStore} />}
        />
      )}
      {isOpenForCreate && (
        <TemplateFormOrganization
          isOpen={isOpenForCreate}
          closeModal={ModalCreate}
          title="Criar loja"
          content={<CreateStoreModal establishment={establishmentID} />}
        />
      )}
    </div>
  );
}
