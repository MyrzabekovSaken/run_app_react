import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons' 
import format from 'date-fns/format';
import { startOfMonth, lastDayOfMonth, startOfWeek, lastDayOfWeek, eachDayOfInterval, isSameDay, isSameMonth, isWeekend, addMonths, subMonths } from 'date-fns';


import "@/styles/Client.css";

const Client = () => {
  const [data, setData] = useState([]);
  const numCols = 7;
  const numRows = 5;
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/trainings/')
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'dd-MM-yyyy');
  };

  const handleTrainingClick = (training) => {
    setSelectedTraining(training);
  };

  const generateCalendar = () => {
    const calendar = [];

    const firstDay = startOfMonth(currentDate);
    const lastDay = lastDayOfMonth(currentDate);
    const startDate = startOfWeek(firstDay, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(lastDay, { weekStartsOn: 1 });
    const totalDate = eachDayOfInterval({ start: startDate, end: endDate });

    for (let i = 0; i < numRows; i++) {
      const week = [];
      for (let j = 0; j < numCols; j++) {
        const dateIndex = i * numCols + j;
        const date = totalDate[dateIndex];
        const isCurrentMonth = isSameMonth(date, currentDate);

        let cellClass = 'clickable-cell';
        if (!isCurrentMonth) {
          cellClass += ' not-current-month';
        }
        if (isWeekend(date)) {
          cellClass += ' weekend';
        }
        if (isSameDay(date, today)) {
          cellClass += ' today';
        }

        const matchingTraining = data.find(training => isSameDay(new Date(training.date), date));
        const dayOfMonth = format(date, 'd');

        week.push(
          <td key={dateIndex} onClick={() => handleTrainingClick(matchingTraining)} className={cellClass}>
            <div className="training">
              <div className="date">{dayOfMonth}</div>
              <div className="title">{matchingTraining?.title}</div>
            </div>
          </td>
        );
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };


  return (
    <>
      <div className="calendar-container">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '1rem 0' }}>
          <Button variant='primary' onClick={handlePrevMonth}><ChevronLeft>prev</ChevronLeft></Button>
          <span>
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <Button variant='primary' onClick={handleNextMonth}><ChevronRight>next</ChevronRight></Button>
        </div>
        <Table bordered>
          <thead>
            <tr>
              <th>Пон</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чет</th>
              <th>Пят</th>
              <th>Суб</th>
              <th>Вос</th>
            </tr>
          </thead>
          <tbody>{generateCalendar()}</tbody>
        </Table>
        
        <Modal show={selectedTraining !== null} onHide={() => setSelectedTraining(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Training Details</Modal.Title>
          </Modal.Header>
          {selectedTraining && (
            <Modal.Body>
              <p>Дата: {formatDate(selectedTraining.date)}</p>
              <p>Название: {selectedTraining.title}</p>
              <p>Описание: {selectedTraining.description}</p>
              <p>Заметки: {selectedTraining.notes}</p>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="primary" onClick={() => setSelectedTraining(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Client;
