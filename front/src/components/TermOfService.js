import * as React from "react";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import * as Constant from "../constant";

function TermOfService(props) {

  const {t, i18n} = useTranslation()
  const history = useHistory();

  useEffect(() => {
    document.title = t('termOfService.title');
    window.gtag('config', Constant.REACT_APP_GATAG_ID);
  }, []);

  return (
    <Grid container style={{maxWidth: '1000px', margin: '0.5px auto 0px'}}>
      <Grid item sm={12} style={{padding: "20px 50px", margin: "15px 6px", background: "white", borderRadius: '5px'}}>

      </Grid>
    </Grid>
  );

}

export default TermOfService;