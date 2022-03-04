import { useState } from 'react';

import './App.css';

import { FiSearch } from 'react-icons/fi';

import api from './services/api';

const App = () => {
    const [input, setInput] = useState('');
    const [zipcode, setZipcode] = useState({});

    async function handleSearch() {
        // /13690000/json
        if (input === '') {
            alert('Empty field is not allowed!');
            return;
        }

        try {
            const response = await api.get(`${input}/json`);

            setZipcode(response.data);

        } catch {
            alert('Error when searching for the zip code! Try later.');
        }

        setInput('');
    }

    return (
        <div className="container">
            <h1 className="title">ZIP Code Finder</h1>

            <div className="containerInput">
                <input type="text" placeholder="*Enter the zip code..." value={ input } onChange={ (e) => setInput(e.target.value) } />

                <button className="buttonSearch" onClick={ handleSearch }>
                    <FiSearch size={25} color="#FFF" />    
                </button>
            </div>

            {Object.keys(zipcode).length > 0 && (
                <main className="main">
                    <h2>Zip Code: { zipcode.cep }</h2>
    
                    <span><b>Address:</b> { zipcode.logradouro }</span>
                    <span><b>Complement:</b> { zipcode.complemento }</span>
                    <span><b>District:</b> { zipcode.bairro }</span>
                    <span><b>{ zipcode.localidade }</b> - { zipcode.uf }</span>
                </main>
            )}
        </div>
    );
}
 
export default App;