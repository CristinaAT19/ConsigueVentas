import React, {useContext} from 'react';
import AsistenciaMa from '../../components/AsistenciaMa';
import AsistenciaPer from '../../components/AsistenciaPer';
import AsistenciaTarde from '../../components/AsistenciaTarde';
import { UserContext } from '../../components/context/UserContext';
import TablaDia from '../../components/TablaDia';
import TablaSin from '../../components/TablaSin';
const Dashboard = () => {

  const {user} = useContext(UserContext);
  console.log(user);

  return (
    <>
    <div className="App" style={{ width: '100%', height: '320px', display: 'flex', justifyContent: 'space-evenly' }}>
        {/* <h1> {JSON.stringify(user,null,3)} </h1> */}
        <div style={{ width: '35%'}}>
          <h1 style={{ textAlign: 'center' }}>Mañana</h1>
          <AsistenciaMa/>
        </div>
        <div style={{ width: '35%' }}>
          <h1 style={{ textAlign: 'center' }}>Tarde</h1>
          <AsistenciaTarde/>
        </div>
      </div >
      <div className="App" style={{ width: '100%', height: '320px' }}>
        <h1 style={{ textAlign: 'center' }}>Personal</h1>
        <AsistenciaPer/>
      </div>
      <br/>
      <br />
      <br />
      <TablaDia />
      <TablaSin/>
    </>
  );
};

export default Dashboard;
