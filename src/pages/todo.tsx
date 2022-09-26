import './todo.scss'

function TodoPage() {
    return (
        <div className="todo">
            <div className="navbar">
                <div>
                    <h1 className='navbar__title'>Todo list</h1>
                </div>
                <div className='clickable-icon'>
                    <i className="bi bi-plus-lg"></i>
                </div>
            </div>


            <ul className='todo__list'>
                <li className="task">
                    <div className="task__select">
                        <input type="checkbox" className='around-checkbox' />
                    </div>
                    <div className='task__text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li className="task">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
            </ul>
        </div>
    );
}

export default TodoPage;
