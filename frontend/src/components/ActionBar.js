import * as React from "react";
import {useState} from "react";
import "./ActionBar.module.scss";
import {useTranslation} from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import UserContext from "../context/UserContext";
import {Dialog} from "@material-ui/core";
import {TabPanel} from '@material-ui/lab';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import AutomatonGuide from "./AutomatonGuide";
import PlayGuide from "./PlayGuide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";

function ActionBar(props) {

  const {t, i18n} = useTranslation();
  const user = React.useContext(UserContext);

  const [tabValue, setTabValue] = useState('1');
  const [openGuideDialog, setOpenGuideDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);

  const SaveButton = <Button variant="outlined" color="primary" onClick={props.onSave}
                             style={{marginRight: '10px', width: '75px'}}>{t('actionBar.save')}
  </Button>;

  const GuideDialog = () => (
      <Dialog maxWidth="md" open={openGuideDialog} onClose={() => setOpenGuideDialog(false)}>
        <DialogContent>
          <Paper>
            <TabContext value={tabValue}>
              <AppBar position="static" color="default">
                <TabList
                  onChange={handleChangeTab}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="disabled tabs example"
                >
                  <Tab label={t('home.aboutAutomaton')} value="0"/>
                  <Tab label={t('home.howToPlay')} value="1"/>
                </TabList>
              </AppBar>
              <TabPanel value="0">
                <AutomatonGuide/>
              </TabPanel>
              <TabPanel value="1">
                <PlayGuide/>
              </TabPanel>
            </TabContext>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGuideDialog(false)} variant="outlined" color="default">
            {t('common.close')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  ;

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  }

  const renderSaveButton = () => {
    if (user) {
      return SaveButton;
    }
    return null;
  }

  const onReset = () => {
    setOpenResetDialog(false);
    props.onReset();
  }
  const ResetDialog = () => (
    <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
      <DialogContent>
        <DialogContentText>
          {t('actionBar.resetDialog.message')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenResetDialog(false)} color="default">
          {t('common.cancel')}
        </Button>
        <Button onClick={onReset} variant="contained" color="secondary">
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Grid container style={{padding: '8px'}}>
      <Grid item sm={6}>
        <Button variant="outlined" color="default" style={{margin: '0px 10px 0px 5px'}}
                onClick={() => setOpenGuideDialog(true)}>
          {t('actionBar.howToPlay')}
        </Button>
        <Button variant="outlined" color="secondary"
                onClick={() => setOpenResetDialog(true)}>
          {t('actionBar.reset')}
        </Button>
      </Grid>
      <Grid item sm={6} style={{textAlign: 'right'}}>
        <span>
          {renderSaveButton()}
          <Button variant="contained" color="primary" onClick={props.onTest}
                  style={{marginRight: '10px', width: '75px'}} disabled={props.animationStart}>
            {t('actionBar.test')}</Button>
          <Button variant="contained" color="secondary" style={{marginRight: '7px', width: '75px'}}
                  onClick={props.onCancel} disabled={!props.animationStart}>
            {t('actionBar.stop')}
          </Button>
        </span>
      </Grid>
      <div>
        {GuideDialog()}
        {ResetDialog()}
      </div>
    </Grid>
  );

}

export default ActionBar;