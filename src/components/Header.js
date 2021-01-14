import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  header: {
    width: '100%',
    border: '1px solid black',
    margin: '0 0 20px 0',
  },
  headerTitle: {
    color: 'black',
  }
});

function Header() {
  const HeaderStyle = useStyles();

  return (
    <header className={HeaderStyle.header}><p className={HeaderStyle.headerTitle}>Header</p></header>
  )
}

export default Header;
