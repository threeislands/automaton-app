import * as React from "react";
import {Link} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {useHistory} from 'react-router-dom';
import * as Constant from "../constant";
import DialogTitle from "@material-ui/core/DialogTitle";

function ClearPopup(props) {

  const {t, i18n} = useTranslation();
  const history = useHistory();

  const onNextButtonClick = () => {
    props.setOpen(false);
    history.push(`/play/${props.questionId + 1}`);
  }

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <Paper elevation={4}>
        <DialogContent>
          <DialogContentText style={{fontSize: '1.1rem'}}>
            <Trans i18nKey="clearPopup.message" values={{title: props.title}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)} color="default">
            {t('common.close')}
          </Button>
          <Button onClick={onNextButtonClick} variant="contained" color="primary"
                disabled={props.questionId > Constant.QUESTION_SIZE}>
            {t('clearPopup.nextQuestion')}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );

}

export default ClearPopup;