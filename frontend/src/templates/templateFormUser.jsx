import React from 'react';

export default function TemplateFormUser({ children }) {
  const { title, form, image } = children.props;

  return (
    <div className="h-screen flex overflow-hidden bg-violet-700">
      <div id="login-container" className="pt-10 px-16 pb-16.5 w-5/12 bg-white">
        <div>
          <h2 className="font-medium text-2xl mt-2 mb-4">{title}</h2>
        </div>
        <div className="flex space-x-8 mt-5 mb-7">
          {form}
        </div>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div>
          <p className="text-5xl text-white">Olá, Bem-vindo de volta!</p>
          <div className="flex items-center justify-center mt-4 max-w-[200px] ml-32">
            {image}
          </div>
        </div>
      </div>
    </div>
  );
}
