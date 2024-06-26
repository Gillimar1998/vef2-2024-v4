import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MyTeams from './pages/teams'; // Adjust the import path according to your file structure
import MyGames from './pages/games';
import MyIndex from './pages/Index';
import TeamForm from './pages/TeamsForm';
import GamesForm from './pages/GamesForm';
import TeamDetails from './pages/team';
import GameDetails from './pages/game';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Boltadeildin</h1>
          <nav>
            <ul>
            <li>
                <Link to="/">Forsíða</Link>
              </li>
              <li>
                <Link to="/teams">Lið</Link>
              </li>
              <li>
                <Link to="/games">Leikir</Link>
              </li>
            </ul>
          </nav>
        </header>


        <Routes>
          <Route path="/" element={
            <>
              <section>
                <h2>Forsíða</h2>
                <MyIndex />
              </section>
            </>
          } />
          <Route path="/teams" element={
            <>
              <section>
                <h2>Liðin</h2>
                <MyTeams />
                <TeamForm />
              </section>
            </>
          } />
          <Route path="/games" element={
            <>
              <section>
                <h2>Leikirnir</h2>
                <MyGames />
                <GamesForm />
              </section>
            </>
          } />
           <Route path="/teams/:slug" Component={TeamDetails} />
           <Route path="/games/:id" Component={GameDetails} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
