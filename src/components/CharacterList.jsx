function CharacterList({ characters }) {
  return (
    <div className="character-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.name === "Male" ? "👨" : "👱‍♀️"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span>&nbsp;{item.status}</span>
        <span> - {item.species}</span>
      </div>
    </div>
  );
}