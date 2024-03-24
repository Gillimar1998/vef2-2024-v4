import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from './api';
import { Game } from './games'
import { Team } from './teams';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [game, setGame] = useState<Game| null>(null);
  const [date, setDate] = useState('');
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [home_score, setHome_score] = useState(0);
  const [away_score, setAway_score] = useState(0);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await fetchData(`/games/${id}`);
        setGame(gameData);
        setDate(gameData.date);
        setHome(gameData.home.id);
        setAway(gameData.away.id);
        setHome_score(gameData.home_score);
        setAway_score(gameData.away_score);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    };
  
    const fetchTeams = async () => {
      try {
        const teamsData = await fetchData('/teams');
        setTeams(teamsData);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };
  
    fetchGameDetails();
    fetchTeams();
  }, [id]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateData(`/games/${id}`, { date, home, away, home_score, away_score });
      navigate('/Games');
    } catch (error) {
      console.error('Failed to update game:', error);
    }
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div>
        <h2>Uppfæra leik: {game.id}</h2>
        <table>
            <thead>
                <tr>
                    <th>Dagsetning</th>
                    <th>Heimalið</th>
                    <th>Heimalið skor</th>
                    <th>Útilið skor</th>
                    <th>Útilið</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{game.date}</td>
                    <td>{game.home.name}</td>
                    <td>{game.home_score}</td>
                    <td>{game.away_score}</td>
                    <td>{game.away.name}</td>
                </tr>
            </tbody>
        </table>

        <form onSubmit={handleUpdate}>
      <label htmlFor="date">Dagsetning:</label>
      <input
        type="datetime-local"
        id="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label htmlFor="home">Heimalið:</label>
      <select
        id="home"
        name="home"
        value={home}
        onChange={(e) => setHome(e.target.value)}
        required
      >
        <option value="">Heimalið</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      <label htmlFor="away">Útilið:</label>
      <select
        id="away"
        name="away"
        value={away}
        onChange={(e) => setAway(e.target.value)}
        required
      >
        <option value="">Útilið</option>
        {teams.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>

      <label htmlFor="homeScore">Heimlið Skor:</label>
      <input
        type="number"
        id="homeScore"
        name="homeScore"
        value={home_score}
        onChange={(e) => setHome_score(parseInt(e.target.value, 10))}
        required
      />

      <label htmlFor="awayScore">Útilið Skor:</label>
      <input
        type="number"
        id="awayScore"
        name="awayScore"
        value={away_score}
        onChange={(e) => setAway_score(parseInt(e.target.value, 10))}
        required
      />

      <button type="submit">Uppfæra  leik</button>
    </form>
    </div>
  );
};

export default GameDetails;