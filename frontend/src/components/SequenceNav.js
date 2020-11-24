import * as React from "react";
import * as style from "./SequenceNav.module.scss";
import {useTranslation} from "react-i18next";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import {prop} from "ramda";
import * as R from "ramda";

function SequenceNav(props) {

  const {t, i18n} = useTranslation();

  const renderAcceptList = () => {
    return props.sequenceList.filter(s => s.accept).map(s => {
      let styles = getStyle(s.id);
      let displayValue = getDisplayValue(s.id);
      return (
        <ListItem key={s.value} dense className={styles.className}>
          <ListItemIcon>
            <i className={styles.icon}></i>
          </ListItemIcon>
          <ListItemText id={s.id} primary={displayValue}/>
        </ListItem>
      );
    })
  }

  const renderRejectList = () => {
    return props.sequenceList.filter(s => !s.accept).map(s => {
      let styles = getStyle(s.id);
      let displayValue = getDisplayValue(s.id);
      return (
        <ListItem key={s.value} role={undefined} dense className={styles.className}>
          <ListItemIcon>
            <i className={styles.icon}></i>
          </ListItemIcon>
          <ListItemText id={s.id} primary={displayValue}/>
        </ListItem>
      );
    })
  }

  const getStyle = (id) => {
    let s = props.sequenceStatusList.find(s => s.id === id);

    if (!s) {
      return {icon: 'far fa-circle', className: ''};
    }

    let status = s.status;

    if (status === 'success') {
      return {icon: 'far fa-check-circle', className: style.bgSuccess};
    } else if (status === 'failed') {
      return {icon: 'far fa-times-circle', className: style.bgFailed};
    } else if (status === 'playing') {
      return {
        icon: 'far fa-play-circle ' + style.playingAnimation, className: style.bgPlaying
      };
    } else {
      return {icon: 'far fa-circle', className: ''};
    }
  }

  const getDisplayValue = (id) => {
    let s = props.sequenceList.find(s => s.id === id);
    let ss = props.sequenceStatusList.find(ss => ss.id === id);

    if (s.masked === true && (!ss || ss.status === 'none')) {
      if (s.value === '') {
        return '???';
      } else {
        return R.join('', R.repeat('?', s.value.length));
      }
    } else {
      if (s.value === '') {
        return t('sequenceNav.emptyString');
      } else {
        return s.value;
      }
    }
  }

  return (
    <Paper elevation={3} style={{padding: '8px 3px 3px 10px', marginTop: '15px'}}>
      <div style={{margin: "10px 6px 0px"}}>
        <p style={{
          marginBlockStart: "0px",
          marginBlockEnd: "0px",
          fontSize: "1.2rem",
        }}>{t('sequenceNav.acceptingString')}</p>
        <List style={{}}>
          {renderAcceptList()}
        </List>
      </div>
      <div style={{margin: "8px 6px 0px"}}>
        <p style={{
          marginBlockStart: "0px",
          marginBlockEnd: "0px",
          fontSize: "1.2rem",
        }}>{t('sequenceNav.notAcceptingString')}</p>
        <List>
          {renderRejectList()}
        </List>
      </div>
    </Paper>
  );
}

export default SequenceNav;