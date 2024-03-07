import React, { useState, ChangeEvent, FocusEvent, useEffect, FormEvent } from "react";

//CSS
import styles from "./TaskForm.module.css"


// Interface
import { ITask } from '../interfaces/Task';

interface Props {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number, category: string): void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {


  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {

    if(task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
      setCategory(task.category);
    }
  }, [task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, difficulty, category); 
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = {id, title, difficulty, category};

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDifficulty(0);
      }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title") {
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value));
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input 
          type="text" 
          name="title" 
          placeholder="Título da tarefa" 
          onChange={handleChange}
          value={title}
          
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input 
          type="text" 
          name="difficulty" 
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">categoria:</label>
        <select value={category} name="category" onChange={handleSelectChange}>
          <option value="" className={styles.categorias}>selecione categorias</option>
          <option value="Estudar">Estudar</option>
          <option value="Academia">Academia</option>
          <option value="Lazer">Lazer</option>
          <option value="Refeições">Refeições</option>
          <option value="Supermecado">Supermecado</option>
        </select>
      </div>
      <input type="submit" value={btnText}/>
    </form>
  );
};

export default TaskForm;