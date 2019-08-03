import React from 'react';

const ToDoList = (props) => {
    let filteredList = props.todos.filter(item => (item.title.toLowerCase()).includes(props.searchTodo.toLowerCase()));
    return (
        <div>
            {0 < filteredList.length ? (
                <ul className="todo-ul">
                    {filteredList.map((item) => {
                        return (
                            <li key={item.id}>
                                {props.editId === item.id ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            name="editItem"
                                            className="item-input"
                                            value={props.editItem}
                                            onChange={props.handleInputChange}
                                        />

                                        <button className="btn-save" onClick={() => props.handleUpdate()} type="button">Save</button>
                                        <button className="btn-remove" onClick={() => props.cancelUpdate()} type="button">Cancel</button>
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            <div className="item">{item.title}</div>
                                            <button className="btn-edit" onClick={() => props.renderEdit(item)} type="button">Edit</button>
                                            <button className="btn-remove" onClick={() => props.removeItem(item.id)} type="button">Remove</button>
                                        </React.Fragment>
                                    )}
                                
                            </li>
                        )
                    })}
                </ul>
            ) : (<p>No todos items found.</p>)}

        </div>
    );
};

export default ToDoList;