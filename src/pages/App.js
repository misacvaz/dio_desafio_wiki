import loGithub from '../assents/logoGithub.png';
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import Button from '../components/Button';
import { api } from './services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearcheRepo = async () => {
    // Verifica se o formato do repositório está correto
    if (!currentRepo.includes('/')) {
      alert('Por favor, insira o repositório no formato "owner/repo". Exemplo: nome/nomeDoRepositorio');
      return;
    }

    try {
      // Chamada para a API do GitHub
      const { data } = await api.get(`repos/${currentRepo}`);

      if (data.id) {
        const isExist = repos.find((repo) => repo.id === data.id);

        if (!isExist) {
          setRepos((prev) => [...prev, data]);
          setCurrentRepo('');
          return;
        }

        alert('Repositório já adicionado à lista.');
      }
    } catch (error) {
      // Trata erros da API
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado. Verifique se o nome está correto.');
      } else {
        alert('Erro ao buscar o repositório. Tente novamente mais tarde.');
      }
    }
  };

     // Função para abrir o repositório em uma nova aba
    const handleOpenRepo = (repo) => {
    console.log("Abrindo repositório:", repo.html_url);
    window.open(repo.html_url, "_blank");
  };

    const handleRemoveRepo = (id) =>{
      console.log('Removendo registro', id)
      
       // Remove o repositório com o id especificado
      setRepos((prevRepos) => prevRepos.filter((repo)=> repo.id !== id))

     
    }

  return (
    <Container className="App">
      <img src={loGithub} width={72} height={72} alt="logo do GitHub" />
      <Input 
        value={currentRepo} 
        onChange={(e) => setCurrentRepo(e.target.value)} 
        placeholder="Digite no formato owner/repo (ex.: nome/nomeDoRepositorio')" 
      />
      <Button onClick={handleSearcheRepo} />
      {repos.map((repo) => (
        <ItemRepo key={repo.id} repo={repo} onOpen={handleOpenRepo} onRemove={handleRemoveRepo}/>
      ))}
    </Container>
  );
}

export default App;
