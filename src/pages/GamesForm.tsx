import React, { useState, useEffect } from 'react';
import { fetchData, PostData } from './api'; // Ensure these are correctly implemented
import { Team } from './teams';

const GamesForm: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [date, setDate] = useState('');
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  useEffect(() => {
    fetchData('/teams').then((fetchedTeams) => {
      setTeams(fetchedTeams);
    }).catch(error => console.error("Failed to fetch teams:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        date,
        home,
        away,
        home_score: homeScore,
        away_score: awayScore,
      };

      await PostData('/games', data);
      window.location.reload();
      console.log('Game added successfully');
      // Reset form or provide further user feedback
    } catch (error) {
      console.error('Error posting game:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        value={homeScore}
        onChange={(e) => setHomeScore(parseInt(e.target.value, 10))}
        required
      />

      <label htmlFor="awayScore">Útilið Skor:</label>
      <input
        type="number"
        id="awayScore"
        name="awayScore"
        value={awayScore}
        onChange={(e) => setAwayScore(parseInt(e.target.value, 10))}
        required
      />

      <button type="submit">Bæta við leik</button>
    </form>
  );
};

export default GamesForm;