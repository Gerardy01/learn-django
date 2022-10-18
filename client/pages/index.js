import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'


export default function Home() {

  const [loading, setLoading] = useState(false);

  const [todoListData, setTodoListData] = useState(null);

  const [todoInput, setTodoInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const fetchTodoListData = () => {
    fetch('http://127.0.0.1:8000/todo/', {
      method: 'GET',
      mode: 'cors'
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          setTodoListData(data.data)
        });
      }

      if (res.status === 500) {
        alert('server error');
        res.json().then(data => {
          console.log(data)
        });
        return
      }
    }).catch(err => {
      // alert('something wrong, try again')
      console.log(err);
    });
  }

  useEffect(() => {
    fetchTodoListData()
  }, [])



  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/todo/${id}`, {
      method: 'DELETE',
      mode: 'cors'
    }).then(res => {
      if (res.status === 404) {
        setLoading(false);
        alert('something wrong, try again')
        return
      }

      if (res.status === 500) {
        setLoading(false);
        alert('server error');
        res.json().then(data => {
          console.log(data)
        });
        return
      }

      fetchTodoListData();
      setLoading(false);

    }).catch(err => {
      alert('something wrong, try again')
      console.log(err);
    })
  }



  function handleSubmit(e) {
    e.preventDefault();
    
    setLoading(true);

    fetch('http://127.0.0.1:8000/todo/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: todoInput,
        description: descriptionInput
      })
    }).then(res => {

      if (res.status === 400) {
        setLoading(false);
        alert('todo field cannot be empty');
        return
      }

      if (res.status === 500) {
        setLoading(false);
        alert('server error');
        res.json().then(data => {
          console.log(data)
        });
        return
      }

      fetchTodoListData();
      setLoading(false);

    }).catch(err => {
      alert('something wrong, try again')
      console.log(err);
    });
  }

  if (loading) {
    return <h1 className={styles.loading}>sabar woy</h1>
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.header}>TODO LIST</h1>
      <ul className={styles.todoListHolder}>
        {todoListData && todoListData.map(e => {
          return <li className={styles.listTodo} key={e.id}>
            <h3 className={styles.listTodoTitle}>{e.title}</h3>
            <p>{e.description}</p>
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        })}
      </ul>
      <form className={styles.todoForm} onSubmit={e => handleSubmit(e)}>
        <p>What you want to do :</p>
        <input
          placeholder='todo'
          type='text'
          onChange={e => setTodoInput(e.target.value)}
          value={todoInput}
        />
        <p>Description:</p>
        <textarea 
          placeholder='todo description'
          rows="6"
          cols="50"
          onChange={e => setDescriptionInput(e.target.value)}
          value={descriptionInput}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
