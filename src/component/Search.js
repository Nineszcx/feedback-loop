import React from 'react';
import '../css/Search.css';

const Search = ({ searchFilters, setSearchFilters }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="search-container">
            <input
                type="date"
                name="date"
                onChange={handleChange}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Search by Content..."
                name="content"
                onChange={handleChange}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Search by ID..."
                name="id"
                onChange={handleChange}
                className="search-input"
            />
        </div>
    );
};

export default Search;