import React, { useEffect, useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchData, updateData } from './api';
import { Team } from './teams';

const TeamDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchData(`/teams/${slug}`).then(data => {
      setTeam(data);
      setName(data.name);
      setDescription(data.description);
    }).catch(error => console.error("Failed to fetch team details:", error));
  }, [slug]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateData(`/teams/${slug}`, { name, description });
      navigate('/Teams');
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  if (!team) return <div>Loading...</div>;

  return (
    <div>
      <h2>Uppfæra: {team.name}</h2>
      <h3>{team?.slug}</h3>
      <h3>{team?.description}</h3>
      <form onSubmit={handleUpdate}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Uppfæra</button>
      </form>
    </div>
  );
};

export default TeamDetails;
