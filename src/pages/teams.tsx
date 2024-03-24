import React, { useEffect, useState } from 'react';
import { deleteData, fetchData } from './api';
import { Link } from 'react-router-dom';

export type Team = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

const MyTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchData('/teams').then((fetchedTeams: Team[]) => {
      setTeams(fetchedTeams);
    }).catch(error => console.error("Failed to fetch teams:", error));
  }, []);

  const handleDelete = async (teamSlug: string) => {
    try {
      await deleteData(`/teams/${teamSlug}`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete team:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nafn</th>
            <th>Stytting</th>
            <th>Um liðið</th>
            <th>Aðgerðir</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.slug}</td>
                <td>{team.description}</td>
                <td>
                  <button onClick={() => handleDelete(team.slug)}>Eyða</button>
                </td>
                <td>
                  <Link to={`/teams/${team.slug}`}>Breyta</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Sæki lið...</td> 
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyTeams;