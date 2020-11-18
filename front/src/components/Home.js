import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UserContext from "../context/UserContext";
import * as R from "ramda";
import * as style from "./Home.module.scss";
import Button from "@material-ui/core/Button";
import {Trans, useTranslation} from "react-i18next";
import * as Constant from "../constant";


function Home() {

  const user = React.useContext(UserContext);
  const history = useHistory();
  const {t, i18n} = useTranslation();

  const ITEM_LIST = [
    {iconClass: 'far fa-lightbulb'},
    {iconClass: 'fas fa-mouse'},
    {iconClass: 'far fa-keyboard'},
    {iconClass: 'fas fa-gamepad'},
    {iconClass: 'fas fa-mobile-alt'},
    {iconClass: 'fas fa-laptop'},
    {iconClass: 'fas fa-fighter-jet'},
    {iconClass: 'fas fa-robot'},
  ];

  useEffect(() => {
    document.title = t('home.title');
    window.gtag('config', Constant.REACT_APP_GATAG_ID);
  }, []);


  const PassedStatusIcon = props => {
    let statusIcon = props.passed ? 'fas' : 'far';
    return (
      <i className={`${statusIcon} fa-heart`}
         style={{'fontSize': '25px', 'float': 'right', 'color': 'hotpink'}}></i>
    );
  }

  const QuestionItem = props => {
    let passed = false;
    if (user && user.testResultList) {
      passed = R.any(s => s.questionId == props.questionId && s.passed)(user.testResultList)
    }
    let passedStatusIcon = <PassedStatusIcon passed={passed}></PassedStatusIcon>

    return (
      <Card style={{background: '#FFEEF3'}} className={style.questionItem}>
        <CardContent style={{textAlign: "center", overflow: 'hidden'}}>
          <div style={{display: 'block', float: 'right'}}>{passedStatusIcon}</div>
          <div style={{display: 'block', clear: 'right', paddingTop: '6px'}}>
            <i className={props.iconClass} style={{'fontSize': '45px'}}></i>
          </div>
          <Typography color="textSecondary" gutterBottom style={{marginTop: '13px'}}>
            <span style={{fontSize: '1.2rem'}}>{props.title}</span>
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const questionList = ITEM_LIST.map((v, i) => {
    return (
      <Grid item sm={3} key={i + 1}>
        <Link to={`/play/${i + 1}`} style={{textDecoration: 'none'}}>
          <QuestionItem title={`${t('home.questionPrefix')} ${i + 1}`} iconClass={v.iconClass}
                        questionId={i + 1}></QuestionItem>
        </Link>
      </Grid>
    );
  });

  return (
    // <>
    <Grid container spacing={0} style={{padding: '15px 0px 20px', marginTop: '0.5px'}}>
      <Grid item sm={12}>
        <Grid container alignItems="center" justify="center" spacing={1}
              style={{
                padding: '30px 14px 8px', background: 'white', borderRadius: '5px',
                maxWidth: '1000px', margin: '0 auto 0 auto'
              }}>
          <Grid item sm={12} style={{textAlign: 'center'}}>
            <div style={{maxWidth: '540px', margin: '20px auto 38px auto', textAlign: 'center'}}>
              <div>
                <p style={{fontSize: '1.5rem'}}>{t('home.welcomeTitle')}</p>
                <Trans i18nKey="home.welcomeMessage"/>
              </div>
            </div>
          </Grid>
          <Grid item sm={4} style={{textAlign: 'center'}}>
            <Button onClick={() => history.push('/automaton_guide')} variant="outlined"
                    style={{width: "220px", height: "50px"}}>
              {t('home.aboutAutomaton')}
            </Button>
          </Grid>
          <Grid item sm={4} style={{textAlign: 'center'}}>
            <Button onClick={() => history.push('/play_guide')} variant="outlined"
                    style={{width: "220px", height: "50px"}}>
              {t('home.howToPlay')}
            </Button>
          </Grid>
          <Grid container spacing={3} alignItems="center" style={{margin: '28px 0px 5px', padding: '5px 0px 0px'}}>
            {questionList}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </>
  );
}

export default Home;