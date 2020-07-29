import * as React from "react";
import "./ActionBar.module.scss";
import * as R from "ramda";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useTranslation} from "react-i18next";

function QuestionArea(props) {

  const {t, i18n} = useTranslation();

  return (
    <Grid container spacing={0}>
      <Grid item sm={12}>
        <Paper elevation={1} style={{padding: '5px 0px 7px 0px', textAlign: 'center'}}>
          <p style={{textAlign: 'left', display: 'inline-block'}}>
            <span style={{fontSize: '1.4rem', display: 'inline-block'}}>{props.questionText}</span><br/>
            <span style={{margin: "9px 0px 0px 1px", display: 'inline-block', fontSize: '1.1rem'}}>
              {t('questionArea.inputSequences')}
              {'{'} {R.join(', ')(props.allowInputs)} {'}'}
            </span>
          </p>
        </Paper>
      </Grid>
    </Grid>
  );

}

export default QuestionArea;