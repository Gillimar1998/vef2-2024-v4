import React, { useState } from 'react';
import { PostData } from './api';

const TeamForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    try {
      const data = { name, description };
      const result = await PostData('/teams', data); 
      setName('');
      setDescription('');

      window.location.reload();
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nafn:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="description">Lýsing:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Bæta við liði</button>
    </form>
  );
};

export default TeamForm;
