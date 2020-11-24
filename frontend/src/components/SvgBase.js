import * as React from "react";
import * as Constant from "../constant";


function SvgBase(props) {

  const svgDom = React.createRef();

  const onClick = (event) => {
    let pt = svgDom.current.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    let newPt = pt.matrixTransform(svgDom.current.getScreenCTM().inverse());
    props.onClick({x: newPt.x, y: newPt.y});
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={Constant.SVG_HEIGHT} width={'100%'} onClick={onClick}
         ref={svgDom} style={{border: 'solid black 1px', maxWidth: `${Constant.SVG_WIDTH}px`}}
         onContextMenu={e => e.preventDefault()}>
      {props.children}
    </svg>
  )
}

export default SvgBase;