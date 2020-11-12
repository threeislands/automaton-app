import * as React from "react";
import {useEffect, useState} from "react";
import * as style from "./Animation.module.scss"
import * as R from "ramda";
import {sequence} from "ramda";
import * as Constant from "../constant";
import ClearEffect from "./ClearEffect";

function Animation(props) {

  const [targetId, setTargetId] = useState('');
  const [input, setInput] = useState('');

  const animateMotionRef = React.createRef();
  const propsRef = React.useRef(props);
  const [pos, setPos] = useState({x: 0, y: 0});
  const [sequenceStatus, setSequenceStatus] = useState('');
  // マーカーがアニメーション切り替えのタイミングで、座標(0,0)に一瞬表示されるので、
  // アニメーション開始前に非表示にして、50ms後に表示して対応
  const [markerVisible, setMarkerVisible] = useState(false);

  let timeoutList = [];

  useEffect(() => {

    if (!props.animationStart) return;
    const animateMotionDom = animateMotionRef.current;

    props.animationTarget.reduce(async (cur, next, tsIndex) => {
      await cur;
      setPos({x: 0, y: 0});
      setSequenceStatus('')
      await new Promise(resolve => {
        let transitionsList = R.insert(0, 'transitionId_0', next.transitionOrderList);
        transitionsList.reduce(async (cur2, next2, tIndex) => {
          setMarkerVisible(false);
          await cur2;
          await new Promise(resolve => {
            const t1 = setTimeout(() => {
              setMarkerVisible(true);
            }, 50);
            const t2 = setTimeout(async () => {
              if (tIndex === 0) {
                propsRef.current.updateStatus(next.sequenceId, 'playing');
              }
              setTargetId(next2 + '_path');
              setInput(props.sequences[tsIndex].value.charAt(tIndex - 1));
              animateMotionDom.beginElement();
              resolve();
            }, tIndex === 0 ? 0 : Constant.AUTOMATON_ANIMATION_DURATION * 1000);
            timeoutList.push(t1);
            timeoutList.push(t2);
          })
        }, Promise.resolve()).then(() => resolve());
      });
      await new Promise(resolve => {
        let stateId = R.last(props.animationTarget[tsIndex].stateOrderList);
        const t1 = setTimeout(() => {
          animateMotionDom.endElement();
          let state = props.states.find(s => s.id === stateId);
          setPos({x: state.x, y: state.y});
        }, Constant.AUTOMATON_ANIMATION_DURATION * 1000);
        const t2 = setTimeout(() => {
          let status = props.animationTarget[tsIndex].result ? 'success' : 'failed';
          propsRef.current.updateStatus(next.sequenceId, status);
          if (props.animationTarget[tsIndex].result) {
            setTargetId('');
            setSequenceStatus('success');
          } else {
            setSequenceStatus('failure');
          }
        }, Constant.AUTOMATON_ANIMATION_DURATION * 1000 + 300);
        const t3 = setTimeout(() => {
          if (!props.animationTarget[tsIndex].result) {
            setSequenceStatus('');
            propsRef.current.setAnimationStart(false);
            return;
          }
          resolve();
        }, Constant.AUTOMATON_ANIMATION_DURATION * 2000);
        timeoutList.push(t1);
        timeoutList.push(t2);
        timeoutList.push(t3);
      })
    }, Promise.resolve()).then(() => {
      propsRef.current.setAnimationStart(false);
      propsRef.current.setClearPopupOpen(true);
    });

    return () => {
      // タイマーをすべてクリア
      timeoutList.forEach(t => clearTimeout(t));
      // 再生中のシーケンスの状態を通常に更新
      let index = R.findIndex(R.propEq('status', 'playing'))(propsRef.current.sequences);
      if (index !== -1) {
        let updated = R.mergeRight(propsRef.current.sequences[index])({'status': 'normal'});
        propsRef.current.updateStatus(index, updated, propsRef.current.sequences)
      }
    }
  }, [props.animationStart]);

  useEffect(() => {
    propsRef.current = props;
  }, [props.sequenceStatusList, props.animationStart]);

  const FailureAnimation = () => {

    const ref = React.createRef();

    useEffect(() => {
      ref.current.beginElement();
    }, [ref]);

    return <animate ref={ref} attributeName="r" values="13;0"
                    dur={`${Constant.AUTOMATON_ANIMATION_DURATION}s`} repeatCount="1"></animate>;
  }

  const renderSuccessAnimation = () => {
    if (sequenceStatus === 'success') {
      return <ClearEffect x={pos.x} y={pos.y}></ClearEffect>
    }
    return null;
  }

  const renderFailureAnimation = () => {
    if (sequenceStatus === 'failure') {
      return <FailureAnimation/>;
    }
    return null;
  }

  if (props.animationStart) {
    return (
      <>
        <g>
          <circle id="transitionPointer" cx={pos.x} cy={pos.y} r="15" fill="#ff1464"
                  style={{display: !markerVisible && 'none'}}
            /*className={failed && style.failed}*/>
            {renderFailureAnimation()}
          </circle>
          <text className={style.pointerText} dx={-7} dy={7} stroke="white">{input}</text>
          <animateMotion ref={animateMotionRef} dur={`${Constant.AUTOMATON_ANIMATION_DURATION + 0.02}s`}
                         repeatCount="1" styles={{display: 'none'}}>
            <mpath xlinkHref={"#" + targetId}></mpath>
          </animateMotion>
        </g>
        {renderSuccessAnimation()}
      </>
    );
  }

  return null;

}

export default Animation;