import * as React from "react";
import {useEffect} from "react";
import * as style from "./State.module.scss";
import {drag} from "d3-drag";
import {select} from "d3-selection";
import * as Constant from "../constant";


function State(props) {

  let clickCount = 0;

  useEffect(() => {
    let s = select("#" + props.id);
    let handler = drag().on("drag", event => {
      if (event.x < 0 || event.x > Constant.SVG_WIDTH
          || event.y < 0 || event.y > Constant.SVG_HEIGHT) {
        return;
      }
      props.updatePos(props.id, {x: event.x, y: event.y});
    });
    handler(s);
  }, [props.states]);

  const onClick = (event) => {
    setTimeout(() => {
      if (clickCount > 0) {
        clickCount--;
        return;
      }
      props.onClickHandler(props.id);
    }, 250);
    event.stopPropagation();
  }

  const onDoubleClick = () => {
    clickCount = 2;
    props.onDoubleClickHandler(props.id);
  }

  const renderAccept = () => {
    if (props.accept) {
      return <circle r="14" cx={props.x} cy={props.y}></circle>;
    }
    return null;
  }

  const stateClass = () => {
    if (props.acitve) {
      return style.active;
    } else {
      return style.normal;
    }
  }

  const renderStartTransition = () => {
    if (props.id === 'stateId_0') {
      return (
        <path d={`M${props.x - 50},${props.y}L${props.x - 20},${props.y}`} id="transitionId_0_path"
              markerEnd="url(#triangle)" stroke="#333333" strokeWidth="2.5px" style={{padding: '3px'}}
              onClick={e => e.stopPropagation()}/>
      );
    }
    return null;
  }

  return (
    <g id={props.id} name="state"
       // className={props.getClassName}
       onClick={onClick}
       onDoubleClick={onDoubleClick}
       onContextMenu={props.contextMenuHandler}
       className={`${style.state} ${stateClass()}`}
    >
      <circle r="20" cx={props.x} cy={props.y}>
      </circle>
      {renderAccept()}
      {renderStartTransition()}
    </g>
  );

}

export default State;