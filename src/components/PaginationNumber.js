function PaginationNumber(props) {

  return (
    <button onClick={props.paginate}>{props.number}</button>
  )
}

export default PaginationNumber;