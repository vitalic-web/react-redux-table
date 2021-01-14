import { makeStyles } from '@material-ui/styles';

import Header from './Header';
import Table from './Table';
import Footer from './Footer';

const useStyles = makeStyles({
  app: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function App() {
  const AppStyle = useStyles();

  return (
    <div className={AppStyle.app}>
      <Header />
      <Table />
      <Footer />
    </div>
  );
}

export default App;
