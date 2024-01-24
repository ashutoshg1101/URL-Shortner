import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState} from 'react';


function App() {

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortedUrl , setShortedUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      url: `${originalUrl}`
    }
    try {
      const response = await axios.post('http://localhost:8000/url', body);
      setShortedUrl(response.data.shortURL);
      console.log(response);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Original URL:
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
      </label>
      <button type="submit">Shorten URL</button>
      <input type='text' value={shortedUrl}></input>
    </form>
    </>
  );
}

export default App;
