import { useEffect, useState } from "react";
import { api } from "../../service/api";
import plus from "../../assets/plus.png";
import TemplateFormOrganization from "../../templates/templateFormOrganization";
import DetailEstablishment from "../Establishment/detail";
import CreateEstablishmentModal from "../Establishment/create";

export default function Home() {
  const [establishments, setEstablishments] = useState([]);
  const [isOpenForEdit, setIsOpenForEdit] = useState(false);
  const [isOpenForCreate, setIsOpenForCreate] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  const ModalEdit = () => {
    setIsOpenForEdit(!isOpenForEdit);
  };

  const ModalCreate = () => {
    setIsOpenForCreate(!isOpenForCreate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("api/home/");
        setEstablishments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [establishments]);


  const handleEditClick = (establishment) => {
    setSelectedEstablishment(establishment);
    ModalEdit();
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4 mr-4">
        <h1 className="text-2xl font-bold">Estabelecimentos</h1>
        <button onClick={ModalCreate} className="flex items-center justify-center w-10">
          <img src={plus} alt="Criar_estabelecimento" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {establishments.map((establishment) => (
          <div key={establishment.id} className="bg-gradient-to-r from-indigo-100 to-violet-50 p-6 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{establishment.name}</h2>
            <p className="text-gray-600">{establishment.category}</p>
            <footer className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-gray-600 pr-1">{establishment.state},</p>
                <p className="text-gray-600">{establishment.address}</p>
              </div>
              <button onClick={() => handleEditClick(establishment)} className="bg-violet-500 ml-6 rounded-md px-4 py-2 text-white hover:bg-violet-700 transition-colors">
                Saiba mais
              </button>
            </footer>
          </div>
        ))}
      </div>
      {isOpenForEdit && (
        <TemplateFormOrganization
          isOpen={isOpenForEdit}
          closeModal={ModalEdit}
          title="Dados do estabelecimento"
          content={<DetailEstablishment establishment={selectedEstablishment} />}
        />
      )}
      {isOpenForCreate && (
        <TemplateFormOrganization
          isOpen={isOpenForCreate}
          closeModal={ModalCreate}
          title="Criar estabelecimento"
          content={<CreateEstablishmentModal />}
        />
      )}
    </div>
  );
}
