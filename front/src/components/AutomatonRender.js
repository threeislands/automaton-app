import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import * as R from "ramda";
import Transition from "./Transition";
import State from "./State";
import ContextMenu from "./ContextMenu";
import SvgBase from "./SvgBase";
import ClearEffect from "./ClearEffect";
import * as d3 from "d3";

function AutomatonRender(props) {

  const {t, i18n} = useTranslation();
  const [selectedStateId, setSelectedState] = useState('');

  const DEFAULT_CONTEXT_MENU_INFO = {show: false, x: 0, y: 0, items: []};
  const [contextMenuInfo, setContextMenuInfo] = useState(DEFAULT_CONTEXT_MENU_INFO);

  const STATE_CONTEXT_MENU_ITEMS = [
    {'name': 'change', 'displayText': t('contextMenu.change')},
    {'name': 'delete', 'displayText': t('contextMenu.delete')}
  ];
  const STATE_START_CONTEXT_MENU_ITEMS = [
    {'name': 'change', 'displayText': t('contextMenu.change')},
  ];
  const TRANSITION_CONTEXT_MENU_ITEMS = [
    {'name': 'delete', 'displayText': t('contextMenu.delete')}
  ];

  const renderStates = () => {
    return props.states.map((s, index) => {
      return <State
        id={s.id} x={s.x} y={s.y}
        key={s.id}
        accept={s.accept}
        acitve={s.id === selectedStateId}
        onClickHandler={clickState}
        onDoubleClickHandler={doubleClickState}
        contextMenuHandler={showContextMenu('state', index)}
        updatePos={updateStatePos}
        states={props.states}
        index={index}
      ></State>
    });
  }

  const updateStatePos = (stateId, {x, y}) => {
    let index = R.findIndex(R.propEq('id', stateId))(props.states);
    let updated = R.mergeRight(props.states[index], {x, y});
    let states = R.update(index, updated, props.states);
    setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);
    setSelectedState(stateId);
    props.setStates(states);
  }

  const renderTransitions = () => {
    return props.transitions.map((t, index) => {
      let _from = props.states.filter(s => s.id === t.fromStateId)[0];
      let from = {x: _from.x, y: _from.y};
      let _to = props.states.filter(s => s.id === t.toStateId)[0];
      let to = {x: _to.x, y: _to.y};
      return <Transition key={t.id} id={t.id} isSelf={t.fromStateId === t.toStateId}
                         from={from} to={to} r={20} markerEnd="url(#triangle)"
                         inputs={t.inputs}
                         index={index}
                         validateInputs={validateInputs}
                         contextMenuHandler={showContextMenu('transition', index)}
                         onChangeHandler={updateTransitionInputs}
                         onInputClickHandler={closeContextMenu}
      ></Transition>
    })
  }

  const renderContextMenu = () => {
    if (!contextMenuInfo.show) return null;
    return (
      <ContextMenu show={contextMenuInfo.show} items={contextMenuInfo.items}
                   x={contextMenuInfo.x} y={contextMenuInfo.y}
                   itemClickHandler={itemClick(contextMenuInfo.itemClickCallback)}/>
    );
  };

  const getCount = () => {
    props.setCount(c => c + 1);
    return props.count;
  };

  const clickState = (stateId) => {
    setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);
    if (selectedStateId === '') {
      setSelectedState(stateId);
    } else if (stateId === selectedStateId) {
      setSelectedState('');
    } else {
      setSelectedState(stateId);

      if (isTransitionDuplicate(selectedStateId, stateId)) return;

      let transitions = props.transitions.concat({
        id: `transitionId_${getCount()}`,
        fromStateId: selectedStateId,
        toStateId: stateId,
        inputs: []
      });
      props.setTransitons(transitions);
    }
  }

  const doubleClickState = (stateId) => {
    setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);

    if (isTransitionDuplicate(stateId, stateId)) return;

    let transitions = props.transitions.concat({
      id: `transitionId_${getCount()}`,
      fromStateId: stateId,
      toStateId: stateId,
      inputs: []
    });
    props.setTransitons(transitions);
  }

  const isTransitionDuplicate = (fromStateId, toStateId) => {
    let predicate = R.where({
      'fromStateId': R.equals(fromStateId),
      'toStateId': R.equals(toStateId)
    });
    return R.any(predicate, props.transitions);
  }

  const clickSvg = ({x, y}) => {
    if (contextMenuInfo.show) {
      setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);
      return;
    }
    let states = props.states.concat(
      {
        id: `stateId_${getCount()}`,
        x: x,
        y: y,
        accept: false,
      }
    )
    props.setStates(states);
  }

  const updateTransitionInputs = (index, inputs) => {
    let updated = R.mergeRight(props.transitions[index], {inputs: inputs});
    let newTransitions = R.update(index, updated, props.transitions);
    props.setTransitons(newTransitions);
  }

  const validateInputs = (index, inputs) => {
    if (R.union(props.allowInputs, inputs).length !== props.allowInputs.length) {
      return false;
    }
    let fromStateId = props.transitions[index].fromStateId;
    let id = props.transitions[index].id;
    const predicate = R.where({
      'fromStateId': R.equals(fromStateId),
      'id': R.complement(R.equals(id)),
      'inputs': v => R.intersection(v, inputs).length !== 0
    });
    if (R.any(predicate)(props.transitions))
      return false;
    return true
  }

  const showContextMenu = (name, index) => {
    return (event) => {
      let items;
      if (name === 'state') {
        if (index === 0) {
          items = STATE_START_CONTEXT_MENU_ITEMS;
        } else {
          items = STATE_CONTEXT_MENU_ITEMS;
        }
      } else {
        items = TRANSITION_CONTEXT_MENU_ITEMS;
      }
      let contextMenuInfo = {
        show: true,
        x: event.clientX,
        y: event.clientY,
        items: items,
        itemClickCallback: name === 'state' ?
          clickStateContextMenuItem(index) : clickTransitionContextMenuItem(index)
      }
      setContextMenuInfo(contextMenuInfo);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  const closeContextMenu = () => {
    setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);
  }

  const itemClick = (callback) => {
    return (event, itemName) => {
      callback(itemName);
      setSelectedState('');
      setContextMenuInfo(DEFAULT_CONTEXT_MENU_INFO);
      event.stopPropagation();
    }
  }

  const clickStateContextMenuItem = index => {
    return itemName => {
      if (itemName === 'change') {
        let updated = R.mergeRight(props.states[index],
          {accept: !props.states[index].accept});
        props.setStates(R.update(index, updated, props.states));
      } else if (itemName === 'delete') {
        let deleteStateId = props.states[index].id;
        let transitions = R.filter(R.where(
          {
            'fromStateId': R.complement(R.equals(deleteStateId)),
            'toStateId': R.complement(R.equals(deleteStateId))
          }
        ), props.transitions);
        props.setTransitons(transitions);
        props.setStates(R.remove(index, 1, props.states));
      }
    };
  }

  const clickTransitionContextMenuItem = index => {
    return itemName => {
      if (itemName === 'delete') {
        props.setTransitons(R.remove(index, 1, props.transitions));
      }
    };
  }

  return (
    <div style={{padding: '5px 10px 5px 8px'}}>
      {renderContextMenu()}
      <SvgBase onClick={clickSvg}>
        <defs>
          <marker id="triangle" viewBox="0 0 10 10"
                  refX="10" refY="5"
                  markerUnits="strokeWidth"
                  markerWidth="5" markerHeight="5"
                  orient="auto">
            <path d="M 0 0 L 10 5 L 0 10" fill="#333333"/>
          </marker>
          <g id="state">
            <circle r="20"></circle>
          </g>
          <g id="accept">
            <circle r="20"></circle>
            <circle r="15"></circle>
          </g>
        </defs>
        {renderStates()}
        {renderTransitions()}
        {props.animation()}
      </SvgBase>
    </div>
  )

}


export default AutomatonRender;