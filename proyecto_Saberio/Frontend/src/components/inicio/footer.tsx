import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="wrap">
        <span>URStudy, Universidad del Rosario</span>
        <nav aria-label="Pie de página">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;