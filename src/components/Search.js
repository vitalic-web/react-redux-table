import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  search: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 0 10px',
  },
  input: {
    margin: '0 20px 0 0',
    width: '50%',
  },
});

function Search(props) {
  const SearchStyle = useStyles();

  const getInput = e => {
    props.setSearchWord(e.target.value);
    if (!e.target.value) {
      props.setIsSearch(false);
      props.setUserCard('');
    }
  }

  return (
    <form className={SearchStyle.search} onSubmit={props.search} >
      <input className={SearchStyle.input} type="text" placeholder="Введите слово или фразу" onChange={getInput}
        value={props.searchWord} />
      <button type="submit">Искать</button>
    </form>
  )
}

export default Search;