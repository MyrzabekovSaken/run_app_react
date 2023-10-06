import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "react-bootstrap";

const TrainingModal = ({ show, onHide, trainings, trainingId }) => {
  const training =
    trainings.find((training) => training.id === parseInt(trainingId)) || {};

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (trainingId) {
      axios
        .get(`http://localhost:8000/api/feedbacks/?training=${trainingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          if (res.data.results.length > 0) {
            setFeedbackMessage(res.data.results[0].feedback);
            setFeedback(res.data.results[0]);
          } else {
            setFeedbackMessage("");
            setFeedback(null);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [trainingId]);

  const onSubmit = (data) => {
    if (feedback) {
      let f = { ...feedback };
      f.feedback = data.feedback;
      console.log(f);
      setFeedbackMessage(data.feedback);
      axios
        .put(`http://localhost:8000/api/feedbacks/${feedback.id}/`, f, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          onHide();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      let f = {
        feedback: data.feedback,
        training: trainingId,
        client: JSON.parse(localStorage.getItem("user")).id,
      };
      axios
        .post("http://localhost:8000/api/feedbacks/", f, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setFeedbackMessage(data.feedback);
          onHide();
          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>План</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Дата: {training.date}</p>
          <p>Название: {training.title}</p>
          <p>Описание: {training.description}</p>
          <p>Заметка: {training.notes}</p>
          <p>Обратная связь: {feedbackMessage}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Ваш отзыв"
              onClick={() => reset()}
              {...register("feedback", { required: true })}
            />
            <Button type="submit">Отправить</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrainingModal;
