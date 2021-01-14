import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  tableHead: {
    border: '1px solid black',
    padding: '0 10px',
  },
  tableHeadPic: {
    border: '1px solid black',
  }
});

function TableHead(props) {
  const TableHeadStyle = useStyles();

  return (
    <>
      <tr>
        <th>
          <div>
            {props.idUp && <span>&#9650;</span>}
            {props.idDown && <span>&#9660;</span>}
          </div>
        </th>
        <th>
          <div>
            {props.firstNameUp && <span>&#9650;</span>}
            {props.firstNameDown && <span>&#9660;</span>}
          </div>
        </th>
        <th>
          <div>
            {props.lastNameUp && <span>&#9650;</span>}
            {props.lastNameDown && <span>&#9660;</span>}
          </div>
        </th>
        <th>
          <div>
            {props.emailUp && <span>&#9650;</span>}
            {props.emailDown && <span>&#9660;</span>}
          </div>
        </th>
        <th>
          <div>
            {props.phoneUp && <span>&#9650;</span>}
            {props.phoneDown && <span>&#9660;</span>}
          </div>
        </th>
        <th>
          <div>
            {props.cityUp && <span>&#9650;</span>}
            {props.cityDown && <span>&#9660;</span>}
          </div>
        </th>
        <th></th>
      </tr>
      <tr>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByNumber}>{props.number}</th>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByName}>{props.name}</th>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByLastName}>{props.lastName}</th>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByEmail}>{props.email}</th>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByPhone}>{props.phone}</th>
        <th className={TableHeadStyle.tableHead} onClick={props.sortByCity}>{props.adress}</th>
        <th className={TableHeadStyle.tableHead}>{props.description}</th>
      </tr>
    </>
  )
}

export default TableHead;