import React, { useEffect, useState } from 'react';
import { deleteData, fetchData } from './api';
import {Team} from './teams'
import { Link } from 'react-router-dom';

export type Game = {
  id: number;
  date: String;
  home: Team;
  away: Team;
  home_score: number;
  away_score: number;
  created: string; // Similarly, using string for datetime fields
  updated: string;
};

interface MyGamesProps {
    limit?: number;
  }

const MyGames: React.FC<MyGamesProps> = ({limit}) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchData('/games').then((fetchedGames: Game[]) => {
        const limitedGames = limit? fetchedGames.slice(0,limit) : fetchedGames
        setGames(limitedGames);
    }).catch(error => console.error("Failed to fetch games:", error));
  }, [limit]);

  const handleDelete = async (gameId: number) => {
    console.log("Attempting to delete game with ID:", gameId);
    try {
      await deleteData(`/games/${gameId}`);
      console.log("Game deleted successfully, reloading page...");
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Dagsetning</th>
            <th>Heimalið</th>
            <th>Heimalið skor</th>
            <th>Útilið skor</th>
            <th>Útilið</th>
            <th>Innset</th>
            <th>Uppfært</th>
            <th>Aðgerðir</th>
          </tr>
        </thead>
        <tbody>
        {games.length > 0 ? (
          games.map((Game) => (
            <tr key={Game.id}>
              <td>{Game.date}</td>
              <td>{Game.home.name}</td>
              <td>{Game.home_score}</td>
              <td>{Game.away_score}</td>
              <td>{Game.away.name}</td>
              <td>{Game.created}</td>
              <td>{Game.updated}</td>
              <td><button onClick={() => handleDelete(Game.id)}>Eyða</button></td>
              <td>
                  <Link to={`/games/${Game.id}`}>Breyta</Link>
                </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={8}>Sæki leiki...</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};
export default MyGames;
