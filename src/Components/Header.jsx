const Header = ({ title, btn, onDel }) => {
  return (
    <div className="app-header">
      <h1>{title}</h1>
      <button onClick={onDel}>{btn}</button>
    </div>
  );
};

export default Header;
