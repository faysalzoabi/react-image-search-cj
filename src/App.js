import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('React Image Search');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  //handle submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setImages([]);
    console.log('hello');
    axios.get(`https://pixabay.com/api/?key=10719673-96a765bfec3365b312bfe2d33&q=${searchTerm}&image_type=photo&pretty=true`)
         .then(result => {
           setLoading(false);
           setImages(result.data.hits)
         })
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchTerm">Search Term</label>
        <input onChange={handleChange} value={searchTerm} type="text" className="u-full-width" id="searchTerm"/>
        <button type="submit">Search</button>
      </form>
      <p>
        {loading ? ('loading...'): null}
      </p>
      <section className="images">
         {images.map(image => {
           return <img key={image.id} src={image.webformatURL} alt=""/>
         })}
      </section>
    </div>
  );
}

export default App;
