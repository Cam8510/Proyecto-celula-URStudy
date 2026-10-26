import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="topbar">
      <div className="wrap">
        <a className="logo" href="#" aria-label="URStudy, Universidad del Rosario">
          <b>URStudy</b>
          <small>Universidad del Rosario</small>
        </a>

        <nav className="enlaces" aria-label="Secciones">
          <a href="#como-funciona">Por qué URStudy</a>
          <a href="#ser-monitor">Ser monitor</a>
        </nav>

        <div className="acciones">
          <a className="btn btn-borde btn-sm" href="login.html">
            Iniciar sesión
          </a>
          <a className="btn btn-primario btn-sm" href="registro.html">
            Crear cuenta
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;