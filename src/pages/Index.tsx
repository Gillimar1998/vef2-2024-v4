import React  from 'react';
import MyGames from './games';
import { Link } from 'react-router-dom';


const MyIndex: React.FC = () => {
  

  return (
    <div>
      <h3>Um deildinna</h3>
      <p>Þetta er síða boltardeildarinnar, hér geturu séð öll lið og alla leiki deildarinnar, síðan fór fyrst í loftið 24.Mars 2024 og er enn í vinnslu!</p>

      <h3>Síðustu Leikir</h3>

      <MyGames limit = {5} />

      <h3>Liðin</h3>
      <p>smelltu <Link to='/teams'>hér</Link> til að sjá öll liðin, bæta við eða eyða</p>
      
    </div>
  );
};

export default MyIndex;