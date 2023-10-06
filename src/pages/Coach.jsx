import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Client from "@/pages/Client";


const Coach = () => {
  const { handleSubmit, control, reset } = useForm();
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  // const selectedClientId = watch("client");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/`)
    .then(response => setClients(response.data.results))
    .catch(error => console.error(error));
  }, []);

  const onSubmit = async (formData) => {
    const selectedClientId = formData.client;
    console.log(formData);
    console.log('client', selectedClientId);
    if (!selectedClientId) {
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trainings/",
        { ...formData, client: selectedClientId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log("Training created successfully:", response.data);

      reset({
        title: "",
        description: "",
        notes: "",
        date: "",
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error while creating training:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <h2>Создать новую тренировку</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="client">Клиент:</label>
            <Controller
              name="client"
              control={control}
              defaultValue=""
              onChange={(e) => setSelectedClientId(e.target.value)}
              render={({ field }) => (
                <select {...field}  required>
                  <option value="">Выберите клиента</option>
                  {Array.isArray(clients) &&
                    clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.username}
                      </option>
                    ))}
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="title">Название:</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} required>
                  <option value="">Выберите тип тренировки</option>
                  <option value="Аэробный бег">Аэробный бег</option>
                  <option value="Темповой бег">Темповой бег</option>
                  <option value="Интервальная тренировка">
                    Интервальная тренировка
                  </option>
                  <option value="Фартлек">Фартлек</option>
                  <option value="Отдых">Отдых</option>
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="description">Описание:</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="notes">Заметки:</label>
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="text" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="date">Дата:</label>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="date" {...field} required />}
            />
          </div>
          <Button type="submit">Отправить</Button>
        </form>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body>
            <p>Тренировка успешно добавлена</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Client />
    </>
  );
};

export default Coach;
