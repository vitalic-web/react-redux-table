import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  footer: {
    width: '100%',
    border: '1px solid black',
    margin: '20px 0 0',
  },
  footerTitle: {
    color: 'black',
  }
});

function Footer() {
  const FooterStyle = useStyles();

  return (
    <footer className={FooterStyle.footer}><p className={FooterStyle.footerTitle}>Footer</p></footer>
  )
}

export default Footer;