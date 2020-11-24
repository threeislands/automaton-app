import * as React from "react";
import {useEffect, useRef, useState} from "react";
import * as style from "./Transition.module.scss";
import {getIntersectionOnCircle, rotate, translation} from "../lib/svg-math";
import * as R from "ramda";
import TextField from "@material-ui/core/TextField";
import * as d3 from "d3-selection";

function Transition(props) {

  const INPUT_WIDTH_1CHAR = '26px';
  const INPUT_WIDTH_2CHAR = '36px';
  const INPUT_WIDTH_4CHAR = '46px';

  const VALID_INPUT_PATTERN = /^(|[0-9a-z](,$|,[0-9a-z]){0,2})$/g

  const [inputWidth, setInputWidth] = useState(INPUT_WIDTH_1CHAR);
  const [inputText, setInputText] = useState(R.join(',', props.inputs));

  useEffect(() => {
    if (inputText.length < 2) {
      setInputWidth(INPUT_WIDTH_1CHAR);
    } else if (inputText.length < 4) {
      setInputWidth(INPUT_WIDTH_2CHAR);
    } else {
      setInputWidth(INPUT_WIDTH_4CHAR);
    }
  }, [inputText]);

  const calcPath = () => {
    if (props.isSelf) {
      let intersection = {x: props.to.x, y: props.to.y - 20};
      let start = rotate(props.from, intersection, 0.2)
      let end = rotate(props.from, intersection, -0.2)
      let c1 = {x: start.x - 20, y: start.y - 30};
      let c2 = {x: end.x + 20, y: end.y - 30};
      return `M${start.x},${start.y}C${c1.x},${c1.y},${c2.x},${c2.y},${end.x},${end.y}`
    } else {
      let {from: _from, to: _to} = getIntersectionOnCircle(props.from, props.to, props.r);
      let from = rotate(props.from, _from, 0.15);
      let to = rotate(props.to, _to, -0.15);
      return `M${from.x},${from.y}L${to.x},${to.y}`;
    }
  }

  const calcInputCoordinate = () => {
    if (props.isSelf) {
      return {
        x: props.to.x,
        y: props.to.y - 60,
      }
    } else {
      let t = {
        x: (props.from.x + props.to.x) / 2,
        y: (props.from.y + props.to.y) / 2
      };
      let r = rotate(t, props.to, Math.PI / 2);
      return translation(t, r, 22);
    }
  }

  const onChange = event => {

    let inputText = event.target.value;

    // 入力フォーマット誤り
    if (!inputText.match(VALID_INPUT_PATTERN)) return;

    let inputs = inputText.replace(/,$/, '').split(',');
    if (!inputText) {
      inputs = [];
    }
    // 重複文字あり
    if (R.uniq(inputs).length !== inputs.length) return;

    // 入力許可文字。入力重複チェック
    if (!props.validateInputs(props.index, inputs)) return;

    setInputText(inputText);
    props.onChangeHandler(props.index, inputs);

  }

  const onFocus = () => {
    d3.select(`#${props.id}`).raise();
    // SVG要素の順序を更新した後に、テキストフィールドのフォーカスが外れるので、
    // 再度フォーカスを当てる
    d3.select(`#${props.id} input`).node().focus();
  }

  let {x, y} = calcInputCoordinate();
  return (
    <g id={props.id} name="transition"
       onContextMenu={e => props.contextMenuHandler(e, props.id, 'transition')}
       onClick={e => e.stopPropagation()}
       className={style.transition}>
      <path id={props.id + "_path"} d={calcPath()} markerEnd={props.markerEnd}></path>
      <foreignObject x={x - 15} y={y - 16}
                     width={inputWidth}
                     height='35px'
                     id={'foreign_' + props.id}>
        <TextField onClick={e => props.onInputClickHandler()} variant="outlined" width={inputWidth}
                   maxLength={5} onChange={onChange} value={inputText}
                   onFocus={onFocus} type="tel"/>
      </foreignObject>
    </g>
  );


}

export default Transition;