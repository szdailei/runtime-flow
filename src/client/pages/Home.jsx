/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import defaultVars from '../default-vars.js';
import { useRemoteData } from '../network/index.js';
import { Error } from '../page-components/index.js';
import { ColumnsResizableWrap, LeftBox, RightBoxWrap, RightBox, Handler } from '../components/ColumnsResizable.jsx';
import Flow from '../flow/Flow.jsx';
import DebugSites from '../debug-site/DebugSites.jsx';

function Home() {
  const leftBoxRef = useRef();
  const handlerRef = useRef();

  const { elementsFile } = defaultVars.flowchart;
  const query = {
    command: 'getFile',
    params: elementsFile,
  };

  const { data, error } = useRemoteData(query);
  if (error) return <Error error={error} />;
  if (!data) return null;

  const  { debugSites, elements } = JSON.parse(data);
  console.log("debugSites",debugSites)
  console.log("elements",elements)
  const position = { x: 0, y: 0 };
  elements.forEach((element) => {
    element.position = position;
  });

  return (
    <ColumnsResizableWrap leftBoxRef={leftBoxRef}>
      <LeftBox ratio={0.7} ref={leftBoxRef}>
        <Flow initialElements={elements} />
      </LeftBox>
      <RightBoxWrap leftBoxRef={leftBoxRef} handlerRef={handlerRef}>
        <Handler ref={handlerRef} />
        <RightBox>
          <DebugSites debugSites={debugSites} />
        </RightBox>
      </RightBoxWrap>
    </ColumnsResizableWrap>
  );
}

export default Home;
