import "./Header.scss";
import todoIcon from "../../assets/Icon/todo.png";

function Header() {
  return (
    <header className="header">
      <section className="header__container">
        <img
          src={todoIcon}
          alt="todo-list-icon"
          className="header__icon"
        />
        <h1 className="header__title">TODO APP</h1>
      </section>
    </header>
  );
}

export default Header;
