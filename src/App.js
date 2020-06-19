import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => { 
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepo = await api.post('repositories', {
      title: `New Repository 🤏🏼 ${Date.now()}`,
	    url: `http://github.com/repo/${Date.now()}`,
	    techs: ["Rust", "ReactJS"]
    })

    setRepositories([...repositories, newRepo.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositories.filter(e => e.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => { 
            return (
              <li key={repository.id}><h2>{repository.title}</h2>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>  
            )})
          }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
