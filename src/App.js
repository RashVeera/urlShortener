import {  useEffect, useState } from 'react';
import './App.css';
import mainIcon from "./assets/mainIcon.jpg"


function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [Longurl,setlongurl]=useState("")
  const [error,seterror]=useState("")

  const handleClick =async ()=>{
    if(Longurl===""){
      seterror("Please enter a valid URL")
      return;
    }
    try {
      const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_BITLY_ACCESS}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url: Longurl }),
      });
      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.link);
      } else {
        seterror(`Error: ${data.message || 'Failed to shorten URL'}`);
      }
    } catch (error) {
      console.log(error)
      seterror('Error:', error);
    }
  };
  const handleCopy =()=>{
    navigator.clipboard.writeText(shortUrl)
    alert("shorturl is copied to clipboard")
  }

  return (
    <div className="App">
      {
        error && 
        <div className='error'>
        {error}
        </div>
      }
      <p>Shorten link with just one click !</p>
      <input type='text' value={Longurl} onChange={(e)=>{setlongurl(e.target.value);seterror("");setShortUrl("")}}/>
      <button onClick={()=>{handleClick()}}>Shorten URL</button>
      
      { shortUrl &&
      <>
      <div className='shorturl'>
      <span>{shortUrl}</span>
      <img onClick={()=>handleCopy()} src={mainIcon} alt='copytoclipboard'/>
      </div>
      <p className='fullurl'>{Longurl}</p>
      </>
  }

    </div>
  );
}

export default App;
