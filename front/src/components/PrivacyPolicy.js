import * as React from "react";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import AutomatonImage1 from "../images/automaton.png"
import ElevatorImage from "../images/elevator.png"
import AutoDoorImage from "../images/auto_door.png"
import M1_101Gif from "../images/automaton_101.gif"
import NoLabelImage from "../images/no_label.png"
import DuplicateLabelImage from "../images/duplicate_label.png"
import MultiLabelImage from "../images/multi_lable.png"
import {useHistory} from "react-router-dom";
import * as style from "./AutomatonGuide.module.scss";
import Button from "@material-ui/core/Button";

function PrivacyPolicy(props) {

  const {t, i18n} = useTranslation()
  const history = useHistory();


  return (
    <Grid container style={{maxWidth: '1000px', margin: '0.5px auto 0px'}}>
      <Grid item sm={12} style={{padding: "20px 50px", margin: "15px 6px", background: "white", borderRadius: '5px'}}>

      </Grid>
    </Grid>
  );

}

export default PrivacyPolicy;