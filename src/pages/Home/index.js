import './styles.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const saveTask = async () => {
    const task = await axios.post('http://localhost:3333/todo', {
      title: title,
      description: description,
      date: date,
    });
    getTasks();
  };

  const getTasks = async () => {
    const tasks = await axios.get('http://localhost:3333/todo');
    setTasks(tasks.data);
  };

  const updateTask = async (id, status) => {
    await axios.put('http://localhost:3333/todo/' + id, {
      status: !status,
    });
    getTasks();
  };

  return (
    <div className="container-home">
      <div className="subcontainer-home">
        <div className="container-left">
          <h1>Task List</h1>
          <p>Junte-se a mais de meio milhão de usuários</p>
          <div className="container-form">
            <input
              placeholder="Título"
              onChange={(txt) => setTitle(txt.currentTarget.value)}
            />
            <textarea
              placeholder="Descrição"
              onChange={(txt) => setDescription(txt.currentTarget.value)}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={date}
              onChange={(txt) => setDate(txt)}
            />
            <button onClick={saveTask} className="btn-save">
              Salvar
            </button>
          </div>
        </div>

        <ul className="container-rigth">
          {tasks.map((item) => {
            const formattedDate = moment(item.date).format('DD/MM/yyyy');
            return (
              <li key={item._id}>
                <div>
                  <Link to={'/details/' + item._id}>
                    <h2
                      style={
                        item.status ? {} : { textDecoration: 'line-through' }
                      }
                    >
                      {item.title}
                    </h2>
                    <h3>{formattedDate}</h3>
                    <h3>{item.description}</h3>
                  </Link>
                </div>
                <button onClick={() => updateTask(item._id, item.status)}>
                  <FaCheck size={22} color="#101010" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
