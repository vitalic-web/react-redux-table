import './TableHead.css';

function TableHead(props) {

  return (
    <tr>
      <th className="TableHead" onClick={props.sortByNumber}>{props.number}</th>
      <th className="TableHead" onClick={props.sortByName}>{props.name}</th>
      <th className="TableHead" onClick={props.sortByLastName}>{props.lastName}</th>
      <th className="TableHead" onClick={props.sortByEmail}>{props.email}</th>
      <th className="TableHead" onClick={props.sortByPhone}>{props.phone}</th>
      <th className="TableHead" onClick={props.sortByCity}>{props.adress}</th>
      <th className="TableHead">{props.description}</th>
    </tr>
  )
}

export default TableHead;