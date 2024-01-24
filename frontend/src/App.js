import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState ,useRef} from 'react';


function App() {

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortedUrl , setShortedUrl] = useState('');

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      url: `${originalUrl}`
    }
    try {
      const response = await axios.post('http://localhost:8000/url', body);
      setShortedUrl(response.data.shortURL);
      console.log(response);
      setCopySuccess('');
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
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
      {/* <input type='text' value={shortedUrl} ></input> */}
    </form>

    <div>
      <form>
        <label>
          Generated URL<br/>
        <textarea
          ref={textAreaRef}
          value={shortedUrl}
        />
        {
        /* Logical shortcut for only displaying the 
            button if the copy command exists */
        document.queryCommandSupported('copy') &&
          <div>
            <button onClick={copyToClipboard}>Copy</button> 
            {copySuccess}
          </div>
        }
        </label>
      </form>
    </div>
    </>
  );
}

export default App;
