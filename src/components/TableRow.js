import './TableRow.css';

function TableRow(props) {
  return (
    <tr className="TableRow">
      <th className="TableRow__cell">{props.number}</th>
      <th className="TableRow__cell">{props.name}</th>
      <th className="TableRow__cell">{props.lastName}</th>
      <th className="TableRow__cell">{props.email}</th>
      <th className="TableRow__cell">{props.phone}</th>
      <th className="TableRow__cell">{props.adress}</th>
      <th className="TableRow__cell">{props.description}</th>
    </tr>
  )
}

export default TableRow;