import React, {useEffect} from "react";
import * as R from "ramda";
import * as Constant from "../constant";

function ClearEffect(props) {

  const Drop = props => {

    const animateRef1 = React.createRef();
    const animateRef2 = React.createRef();
    const animateMotionRef = React.createRef();

    useEffect(() => {
      animateRef1.current.beginElement();
      animateRef2.current.beginElement();
      animateMotionRef.current.beginElement();
    }, [animateRef1, animateRef2, animateMotionRef]);

    let rad = (props.angle + 90) * (Math.PI / 180);
    let cos = Math.cos(rad);
    if (Math.abs(cos) < 0.00001) {
      cos = 0;
    }
    let sin = Math.sin(rad);
    if (Math.abs(sin) < 0.00001) {
      sin = 0;
    }
    let x = props.x;
    let y = props.y;
    let dx = x + 15 * cos;
    let dy = y - 15 * sin;
    let tx = 1.35//Math.abs(cos) + 1;
    let ty = 1.35//Math.abs(sin) + 1;

    let animationOpacity1Dur = Constant.AUTOMATON_ANIMATION_DURATION * 1 / 2 + 's';
    let animationOpacity2Dur = Constant.AUTOMATON_ANIMATION_DURATION * 1 / 2 + 's';

    let animateMotionDur = Constant.AUTOMATON_ANIMATION_DURATION + 's';
    return (
      <g>
        <path d="M-5 -30 L0 0 L5 -30 Z" fill={props.color}></path>
        <path d="M5 -30 A5 5 0 0 0 -5 -30" fill={props.color}></path>
        <animate ref={animateRef1} id="clearEffectOpacity1" attributeName="opacity" from="0.2" to="1"
                 dur={animationOpacity1Dur} begin="0s;" repeatCount="1"></animate>
        <animate id="clearEffectOpacity2" attributeName="opacity" from="1" to="0" dur={animationOpacity2Dur}
                 begin="clearEffectOpacity1.end" repeatCount="1"></animate>
        <animateTransform ref={animateRef2} attributeName="transform" type="scale"
                          from="1 1" to={`${tx} ${ty}`} begin="0s" dur={animateMotionDur} additive="sum"></animateTransform>
        <animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from={`-${props.angle} 0 0`}
                          to={`-${props.angle} 0 0`}
                          dur="10s"
                          repeatCount="indefinite" additive="sum"/>
        <animateMotion ref={animateMotionRef} repeatCount="1"
                       path={`M${x},${y} ${dx},${dy}`} dur={animateMotionDur}></animateMotion>
      </g>
    );
  }

  return (
    <>
      {R.range(0, 16).map((n, index, arr) => {
        let perAngle = 360 / arr.length;
        // let color = '';
        // switch (index % 2) {
        //   case 0:
        //     color = "#ff1464";
        //     break;
        //   case 1:
        //     color = "#009944";
        //     break;
        //   case 2:
        //     color = "#8FC31F";
        //     break;
        //   case 3:
        //     color = "#FFF100";
        //     break;
        // }
        return <Drop key={index} angle={n * perAngle} x={props.x} y={props.y} color={"#ff1464"}/>;
      })}
    </>
  );
}

export default ClearEffect;