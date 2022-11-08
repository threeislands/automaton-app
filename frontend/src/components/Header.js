import * as React from "react";
import * as styles from "./Header.module.scss";
import UserContext from "../context/UserContext";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import * as UserService from '../service/user-service';
import * as LoginService from '../service/login-service';
import {Dialog} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";

function Header(props) {

  const user = React.useContext(UserContext);
  const {t, i18n} = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const LoginButton = () =>
    <Button onClick={() => props.setShowLoginModal(show => !show)}
            style={{background: 'white'}} variant="outlined">{t('header.login')}</Button>;

  const UserProfile = () => (
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleToggle}
            ref={anchorRef}
            style={{background: 'white', width: '70%'}} variant="outlined">
      {user.displayName}
    </Button>
  );

  const ProfileMenu = () => (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({TransitionProps, placement}) => (
        <Grow
          {...TransitionProps}
          style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
        >
          <Paper elevation={3}>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow">
                <MenuItem onClick={logout}>{t('header.logout')}</MenuItem>
                <MenuItem onClick={confirmRemoveAccount}>{t('header.removeAccount')}</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const RemoveAccountDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>{t('header.removeAccountDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('header.removeAccountDialog.message')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="default">
          {t('header.cancel')}
        </Button>
        <Button onClick={removeAccount} variant="contained" color="secondary">
          {t('header.removeAccount')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const logout = async () => {
    handleToggle();
    await LoginService.logout();
    window.location.reload(false);
  }

  const confirmRemoveAccount = () => {
    handleToggle();
    setDialogOpen(true);
  }

  const removeAccount = async () => {
    setDialogOpen(false);
    await UserService.deleteUser();
    window.location.reload(false);
  }

  let profileArea = user && user.id ? UserProfile : LoginButton;

  return (
    <Container maxWidth="lg" style={{padding: '0px', background: 'hotpink'}}>

      <Grid container alignItems="center" justify="center"
            style={{borderRadius: '5px', margin: '0 auto 0 auto', maxWidth: '1000px'}}>
        <Grid item sm={9} style={{textAlign: 'center'}}>
          <div style={{margin: '20px 0px'}}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <span className={styles.header}>{t('appTitle')}</span>
            </Link>
          </div>
        </Grid>
        <Grid item sm={3} style={{'textAlign': 'center', paddingRight: '20px'}}>
          {ProfileMenu()}
          {RemoveAccountDialog()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
