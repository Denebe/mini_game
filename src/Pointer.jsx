import React from "react";
import styled from "styled-components";

const Pointer = () => {
  return <PointerContainer />;
};

export default Pointer;

const PointerContainer = styled.div`
  width: 20px;
  height: 40px;
  background: red;
  clip-path: polygon(50% 100%, 0 0, 100% 0); /* 위쪽을 가리키는 삼각형 */
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`;
