const Card = ({ country }) => {
  return (
    <article className="profile-card">
      <img src={country.flags.svg} alt="" className="profile-img" />
      <div className="country-name">{country.name.common}</div>
      <div className="country-Regions">{country.region}</div>
    </article>
  );
};

export default Card;
