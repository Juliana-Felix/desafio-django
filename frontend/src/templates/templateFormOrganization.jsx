import React from 'react';

export default function TemplateFormOrganization({ isOpen, closeModal, title, content }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="">{content}</div>
            <button className="bg-red-400 rounded-md px-4 py-2 mt-4 text-white" onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}