import React from 'react';
import './App.css';
import Form from './Form.jsx'
import formData from './formData'; //imports formData from a formData.js file. You can alter the data in this file and 
// as long as it adheres to the same format, should produce a dynamically updated form.

function App() {
    return (
    <div className="App">
        <header className="App-header">
            <h2>Here's a form!</h2>
        </header>
        <div>
        <Form data={formData} />
        </div>
    </div>
);
}

export default App;
