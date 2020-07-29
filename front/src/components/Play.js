import React, {useEffect, useState} from "react";
import * as style from "./Play.module.css";
import SequenceNav from "./SequenceNav";
import QuestionArea from "./QuestionArea";
import ActionBar from "./ActionBar";
import AutomatonRender from "./AutomatonRender";
import * as QuestionService from '../service/question-service';
import Animation from "./Animation";
import * as TestAutomatonService from "../service/test-automaton-service";
import * as UserService from "../service/user-service";
import * as R from "ramda";
import UserContext from "../context/UserContext";
import * as Constant from "../constant";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {merge, mergeRight} from "ramda";
import ClearPopup from "./ClearPopup";


function Play(props) {

  const user = React.useContext(UserContext);

  const questionId = props.match.params.questionId;
  const [sequences, setSequences] = useState([]);
  const [sequenceStatusList, setSequenceStatusList] = useState([]);
  const [questionData, setQuestionData] = useState(
    {questionText: '', allowInputs: []});

  const INITIAL_COUNT = 1;
  const INITIAL_STATES = [{
    x: 60,
    y: Constant.SVG_HEIGHT / 2,
    id: 'stateId_0',
    accept: false
  }];
  const [states, setStates] = useState(INITIAL_STATES);
  const [transitions, setTransitions] = useState([]);
  const [count, setCount] = useState(INITIAL_COUNT);

  const [animationStart, setAnimationStart] = useState(false);
  const [animationTarget, setAnimationTarget] = useState([]);

  const [clearPopupOpen, setClearPopupOpen] = useState(false);

  useEffect(() => {
    const questionData = async () => {
      const data = await QuestionService.getQuestion(questionId);
      setSequences(R.map(s => R.mergeLeft(s, {status: 'normal'}))(data.sequences));
      setQuestionData(data);

      if (user) {
        let automatonData = await UserService.loadAutomaton(questionId);
        if (automatonData) {
          setStates(automatonData.states);
          setTransitions(automatonData.transitions);
          setCount(automatonData.count);
        }
      }
      console.log(data)
    }
    questionData();
  }, [questionId, user]);

  const testAutomaton = async () => {
    let automaton = {
      states: states,
      transitions: transitions
    }
    let data = await TestAutomatonService.testAutomaton(questionId, automaton);
    // 入力文字列の実行結果を初期化
    setSequenceStatusList(sequences.map(s => Object({id: s.id, status: 'none'})));
    setAnimationTarget(data);
    setAnimationStart(  true);
  }

  const cancelTest = () => {
    setAnimationStart(false);
    setSequenceStatusList([]);
  }

  const saveAutomaton = async () => {
    let automaton = {
      states: states,
      transitions: transitions,
      count: count
    };
    await UserService.saveAutomaton(questionId, automaton);
  }

  const updateSequenceStatus = (id, status) => {
    let index = R.findIndex(s => s.id === id, sequenceStatusList);
    let updated = R.mergeRight(sequenceStatusList[index], {status: status});
    let updateSequenceStatusList = R.update(index, updated, sequenceStatusList);
    setSequenceStatusList(updateSequenceStatusList);
  }

  const resetAutomaton = () => {
    setStates(INITIAL_STATES);
    setTransitions([]);
    setCount(INITIAL_COUNT);
  }

  return (
    <div style={{maxWidth: '1000px', margin: '0.5px auto 0px', padding: "15px 0px 20px"}}>
      <QuestionArea questionText={questionData.questionText}
                    allowInputs={questionData.allowInputs}/>
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <SequenceNav sequenceList={sequences} sequenceStatusList={sequenceStatusList}/>
        </Grid>
        <Grid item sm={9}>
          <ClearPopup open={clearPopupOpen} setOpen={setClearPopupOpen}
                      questionId={questionId} title={questionData.title}></ClearPopup>
          <Paper elevation={3} style={{marginTop: '15px'}}>
            <ActionBar onTest={testAutomaton} onSave={saveAutomaton}
                       onReset={resetAutomaton}
                       onCancel={cancelTest}
                       animationStart={animationStart}></ActionBar>
            <AutomatonRender
              states={states}
              setStates={setStates}
              transitions={transitions}
              setTransitons={setTransitions}
              count={count}
              setCount={setCount}
              allowInputs={questionData.allowInputs}
              questionId={questionId}
              animation={() => (
                <Animation animationStart={animationStart}
                           animationTarget={animationTarget}
                           setAnimationStart={setAnimationStart}
                           updateStatus={updateSequenceStatus}
                           sequences={sequences}
                           questionId={questionId}
                           states={states}
                           sequenceStatusList={sequenceStatusList}
                           setSequenceStatusList={setSequenceStatusList}
                           setClearPopupOpen={setClearPopupOpen}
                />
              )}>
            </AutomatonRender>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Play;