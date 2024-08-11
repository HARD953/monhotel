export default function EquipementListItem({ title, data }) {
  if (!data?.length) return <></>;
  return (
    <div
      style={{
        width: "18rem",
        margin: "0.5rem",
      }}
    >
      <h5 className="h5 fw-bold"> {title} </h5>
      <ul className="ul">
        {!data?.length ? (
          <li className="li">Aucune donnée</li>
        ) : (
          data?.map((item, index) => (
            <li key={index} className="li">
              {item}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
