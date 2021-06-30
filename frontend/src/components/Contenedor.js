import Header from './Header';
import Info from './Info';

const Contenedor = ({ setToken }) => {
  return (
    <div className="col-2">
      {/* <Header user="Nombre Usuario" avatar="movida.png" /> */}
      <Info />
    </div>
  );
};

export default Contenedor;
