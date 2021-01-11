import './TableHead.css';

function TableHead(props) {

  return (
    <tr>
      <th className="TableHead" onClick={props.sort}>{props.number}</th>
      <th className="TableHead">{props.name}</th>
      <th className="TableHead">{props.lastName}</th>
      <th className="TableHead">{props.email}</th>
      <th className="TableHead">{props.phone}</th>
      <th className="TableHead">{props.adress}</th>
      <th className="TableHead">{props.description}</th>
    </tr>
  )
}

export default TableHead;