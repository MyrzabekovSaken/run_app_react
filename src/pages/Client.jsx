import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/Client.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TrainingModal from "@/components/TrainingModal.jsx";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import ruLocale from "@fullcalendar/core/locales/ru";
import { Button } from 'react-bootstrap';


const Client = () => {
  const [trainings, setTrainings] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [trainingId, setTrainingId] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      navigate("/login");
    } else
      {
      axios
        .get("http://127.0.0.1:8000/api/trainings/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setTrainings(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handle = (info) => {
    setTrainingId(info.event.id);
    console.log(info.event.id);
    setModalShow(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <>
      <section className="client-section">
        <h1 className="title">ТРЕНИРОВКИ</h1>
        <p>Welcome, {userData.username}!</p>
        <div>
          <Button onClick={handleLogout} className='logout-button' variant='primary'>Выйти</Button>
        </div>
        {trainings ? (
        <FullCalendar
          editable
          selectable
          plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
          locales={[ruLocale]}
          firstDay={1}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          height={700}
          events={
            trainings &&
            trainings.map((training) => ({
              id: training.id,
              title: training.title,
              date: training.date,
            }))
          }
          eventClick={handle}
        />
        ) : (
          <p>You are not authorized to access this page.</p>
        )}

        {trainings && (
          <TrainingModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            trainings={trainings}
            trainingId={trainingId}
          />
        )}
      </section>
    </>
  );
};

export default Client;
