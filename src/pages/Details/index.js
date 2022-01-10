import { useState, useEffect } from 'react';
import './styles.css';
import { FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  useEffect(() => {
    getTask();
  }, []);

  const notify = () => toast('Atualizado com sucesso!', { type: 'success' });
  const sendSubmit = () => {
    navigate('/');
  };

  const getTask = async () => {
    const task = await axios.get('http://localhost:3333/todo/' + id);
    setTitle(task.data.title);
    setDescription(task.data.description);
    const formattedDate = new Date(task.data.date);
    setDate(formattedDate);
    console.log(task);
  };

  const removeTask = async () => {
    await axios.delete('http://localhost:3333/todo/' + id);
    alert('usuario deletado com sucesso');

    sendSubmit();
  };

  const updateTask = async () => {
    await axios.put('http://localhost:3333/todo/' + id, {
      title: title,
      description: description,
      date: date,
    });
    notify();
  };

  return (
    <div className="container-details">
      <ToastContainer />
      <div className="subcontainer-details">
        <div className="container-header">
          <Link to="/">
            <FaArrowLeft />
            <span>Voltar</span>
          </Link>
        </div>
        <input
          value={title}
          placeholder="Título"
          onChange={(txt) => setTitle(txt.currentTarget.value)}
        />
        <textarea
          value={description}
          placeholder="Descrição"
          onChange={(txt) => setDescription(txt.currentTarget.value)}
        />
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={(txt) => setDate(txt)}
        />
        <div className="container-buttons">
          <button onClick={updateTask}>Salvar</button>
          <button onClick={removeTask}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
