import CardButton from '../CardButton/CardButton';
import { ColumnType } from '../../@types/jobmemo';
import './Column.scss';

function Column({ title, id }: ColumnType) {
  return (
    <div className="Column">
      {title}
      {id}
      <CardButton />
    </div>
  );
}

export default Column;
