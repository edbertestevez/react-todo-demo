import React from 'react';

const AddForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <input
                type="text"
                name="item"
                placeholder="What needs to be done?"
                value={props.item}
                onChange={props.handleInputChange}
            />

            <button className="btn-add" type="button" onClick={props.handleSubmit}>Add Item</button>
        </form>
    );
};

export default AddForm;