import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Client from './Client';


const Coach = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    notes: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/trainings/', formData);
      alert('Тренировка создана!');
      console.log('Training created successfully:', response.data);
      
      setFormData({
        title: '',
        description: '',
        notes: '',
        date: '',
      });
    } catch (error) {
      console.error('Error while creating training:', error);
    }
  };

  return (
    <>
    <div>
      <h2>Создать новую тренировку</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Название:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Описание:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="notes">Заметки:</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Дата:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <Button type='submit'>Отправить</Button>
      </form>
    </div>
    <Client></Client>
    </>
  );
};


export default Coach;
