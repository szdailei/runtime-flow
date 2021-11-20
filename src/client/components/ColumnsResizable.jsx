/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { Div } from '../styled/index.js';
import useWindowPixels from '../browser/index.js';

const handlerWidth = 3;
const grabWidth = handlerWidth + 6;

function isDragingHandler(offset) {
  if (offset > grabWidth) return false;
  return true;
}

const LeftBox = React.forwardRef(({ children, ratio, ...rest }, ref) => {
  const windowPixels = useWindowPixels();

  if (!windowPixels) return null;

  const { width } = windowPixels;
  const LeftBoxWidth = parseInt(width * ratio, 10);
  const boxStyle = {
    display:'block',
    width: LeftBoxWidth,
    height: '100vh',
  };

  return (
    <Div {...rest} style={boxStyle} ref={ref}>
      {children}
    </Div>
  );
});

function RightBox({ children }) {
  const boxStyle = {
    display: 'block',
    width: '100%',
    height: '100vh',
    overflow:'scroll'
  };

  return (
    <Div style={boxStyle}>
      {children}
    </Div>
  );
}

const Handler = React.forwardRef(({ children, style, ...rest }, ref) => {
  const handlerStyle = {
    display: 'block',
    width: `${handlerWidth}px`,
    height: '100vh',
    cursor: 'grab',
    backgroundColor: 'red',
  };

  return <Div {...rest} style={handlerStyle} ref={ref} />;
});

const RightBoxWrap = React.forwardRef(({ leftBoxRef, handlerRef, children, style, ...rest }, ref) => {
  const onDragStart = useCallback(
    (event) => {
      const offset = event.clientX - parseInt(leftBoxRef.current.style.width, 10);
      if (!isDragingHandler(offset)) {
        event.preventDefault();
        return;
      }
      leftBoxRef.current.dataDragStartX = offset;
    },
    [leftBoxRef]
  );

  const eventHandlers = {
    onDragStart,
  };

  const rightBoxWrapStyle = {
    display: 'inline-grid',
    gridTemplateColumns: "auto auto",
    height: '100vh',
  };

  return (
    <Div draggable {...rest} style={rightBoxWrapStyle} {...eventHandlers} ref={ref}>
      {children}
    </Div>
  );
});

const ColumnsResizableWrap = React.forwardRef(({ leftBoxRef, children, style, ...rest }, ref) => {
  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const leftBoxWidth = event.clientX - leftBoxRef.current.dataDragStartX;
      leftBoxRef.current.style.width = `${leftBoxWidth}px`;
    },
    [leftBoxRef]
  );

  const eventHandlers = {
    onDragOver,
    onDrop,
  };

  const ColumnsResizableWrapStyle = {
    display: 'grid',
    gridTemplateColumns: "auto auto",
    alignItems: 'start',
  };

  return (
    <Div {...eventHandlers} {...rest} style={ColumnsResizableWrapStyle} ref={ref}>
      {children}
    </Div>
  );
});

export { ColumnsResizableWrap, LeftBox, RightBoxWrap, RightBox, Handler };
