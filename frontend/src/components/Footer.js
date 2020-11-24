import * as React from "react";
import UserContext from "../context/UserContext";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import * as style from "./Footer.module.scss";
import {Link, useHistory} from "react-router-dom";
import * as Constant from '../constant';


function Footer(props) {

  const user = React.useContext(UserContext);
  const {t, i18n} = useTranslation();

  const history = useHistory();

  return (
    <Container maxWidth="lg" style={{padding: '20px 0px 15px', background: '#F3F3F6'}}>
      <Grid container
            style={{borderRadius: '5px', margin: '0 auto 0 auto', maxWidth: '900px'}}>
        <Grid item sm={4} style={{textAlign: 'left'}}>
          <p className={style.footerListTitle}>{t('footer.aboutLovingAutomaton')}</p>
          <ul className={style.footerList}>
            <li><Link to="/terms_of_service" className={style.footerLink}>
              {t('footer.termOfService')}
            </Link></li>
            <li><Link to="/privacy_policy" className={style.footerLink}>
              {t('footer.privacyPolicy')}
            </Link></li>
            <li><a href={`mailto:${Constant.CONTACT_EMAIL}`} className={style.footerLink}>
              {t('footer.contactUs')}
            </a></li>
          </ul>
        </Grid>
        <Grid item sm={4} style={{textAlign: 'left'}}>
          <p className={style.footerListTitle}>
            {t('footer.watchSource')}
          </p>
          <ul className={style.footerList}>
            <li><a href={Constant.GIT_REPOSITORY_URL} target="_blank"
                   className={style.footerLink}>{t('footer.sourceHere')}</a></li>
          </ul>
        </Grid>
        <Grid item sm={4} style={{textAlign: 'right', margin: 'auto 0 0 auto'}}>
          <span><i>{t('footer.copyright')}</i></span>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
