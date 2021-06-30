// import { useContext } from 'react';
// import { SelectedPersonContext } from './SelectedPersonContextProvider';
// import useUsuarios from '../hooks/useUsuarios';

// // EJERCICIO: Pasar a un CustomHook el estado y el useEffect. Mostrar una ficha con el avatar y el nombre del usuario seleccionado.

// const UserSelector = (props) => {
//   const users = useUsuarios();
//   const [selectedPerson, setSelectedPerson] = useContext(SelectedPersonContext);

//   const optionsArray = users.map((user) => (
//     <option key={user.id} value={user.id}>
//       {user.name}
//     </option>
//   ));

//   return (
//     <>
//       <select
//         value={selectedPerson}
//         onChange={(e) => {
//           setSelectedPerson(e.target.value);
//         }}
//       >
//         {optionsArray}
//       </select>
//     </>
//   );
// };

// export default UserSelector;