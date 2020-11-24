import * as React from "react";
import * as LoginService from "../service/login-service";
import Dialog from "@material-ui/core/Dialog";
import * as style from "./LoginDialog.module.scss";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {Trans, useTranslation} from "react-i18next";

function LoginDialog(props) {

  const {t, i18n} = useTranslation();

  const loginByGoogle = async () => {
    let {state} = await LoginService.getState();
    let googleAuthorizedUrl = LoginService.getGoogleAuthorizationUrl(state);
    window.location.href = googleAuthorizedUrl;
  }

  const loginByTwitter = async () => {
    let {token} = await LoginService.getTwitterToken();
    let twitterAuthorizedUrl = LoginService.getTwitterAuthorizationUrl(token);
    window.location.href = twitterAuthorizedUrl;
  }

  return (
    <Dialog
      // fullWidth={50}
      maxWidth='sm'
      open={props.open}
      onClose={() => props.setOpen(false)}>
      <DialogTitle>
        {t('loginDialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Trans i18nKey="loginDialog.content"/>
        </DialogContentText>
      </DialogContent>
      <List style={{margin: 'auto'}}>
        <ListItem>
          <Button onClick={loginByTwitter} variant="outlined"
                  style={{textTransform: 'none', background: '#1DA1F2'}}
                  className={`${style.loginButton} ${style.twitterBg}`}>
            <i className={`fab fa-twitter ${style.loginIcon}`}/>
            <span className={style.buttonText}>{t('loginDialog.loginWithTwitter')}</span>
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={loginByGoogle} variant="outlined" style={{textTransform: 'none', background: '#DB4437'}}
                  className={`${style.loginButton} ${style.googleBg}`}>
            <i className={`fab fa-google ${style.loginIcon}`}/>
            <span className={style.buttonText}>{t('loginDialog.loginWithGoogle')}</span>
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );

}

export default LoginDialog;