import './Actions.scss';

function Actions() {
  return (
    <div className="menu">
      <div className="btn-delete">Supprimer</div>
      <div className="select-dropdown">
        <select id="select01" defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>
            Modifier la note
          </option>
          <option value="valeur1">⭑</option>
          <option value="valeur2">⭑⭑</option>
          <option value="valeur3">⭑⭑⭑</option>
          <option value="valeur4">⭑⭑⭑⭑</option>
        </select>
      </div>
      <div className="select-dropdown">
        <select id="select02" defaultValue="DEFAULT">
          <option value="DEFAULT" disabled>
            Déplacer vers
          </option>
          <option value="valeur1">Offres</option>
          <option value="valeur2">Candidatures</option>
          <option value="valeur3">Relances</option>
          <option value="valeur4">Entretiens</option>
        </select>
      </div>
    </div>
  );
}
export default Actions;
