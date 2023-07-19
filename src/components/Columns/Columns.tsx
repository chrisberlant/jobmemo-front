import Column from '../Column/Column';
import RecycleBin from '../RecycleBin/RecycleBin';
import './Columns.scss';

function Columns() {
  return (
    <div className="Columns">
      <Column title="Mes Offres" id={0} />
      <Column title="Mes Candidatures" id={1} />
      <Column title="Mes Relances" id={2} />
      <Column title="Mes Entretiens" id={3} />
      <Column title="Mes Archives" id={4} />
      <RecycleBin />
    </div>
  );
}

export default Columns;
