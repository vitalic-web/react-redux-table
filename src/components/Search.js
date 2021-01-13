function Search(props) {
  const getInput = e => {
    props.setSearchWord(e.target.value);
    if (!e.target.value) {
      props.setIsSearch(false);
    }
  }

  return (
    <form onSubmit={props.search} >
      <input type="text" placeholder="Введите слово или фразу" onChange={getInput}
        value={props.searchWord} />
      <button type="submit">Искать</button>
    </form>
  )
}

export default Search;