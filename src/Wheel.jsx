import React from "react";
import styled from "styled-components";

const Wheel = React.forwardRef(({ sections, size = 400 }, ref) => {
  const radius = size / 2;
  const degreesPerSection = 360 / sections.length;

  const createSections = () => {
    return sections.map((section, index) => {
      const startAngle = index * degreesPerSection;
      const endAngle = (index + 1) * degreesPerSection;

      const largeArcFlag = degreesPerSection > 180 ? 1 : 0;

      // Convert polar to Cartesian coordinates
      const startX = radius + radius * Math.cos((Math.PI * startAngle) / 180);
      const startY = radius - radius * Math.sin((Math.PI * startAngle) / 180);
      const endX = radius + radius * Math.cos((Math.PI * endAngle) / 180);
      const endY = radius - radius * Math.sin((Math.PI * endAngle) / 180);

      const pathData = `
        M ${radius} ${radius} 
        L ${startX} ${startY} 
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} 
        Z
      `;

      return (
        <path
          key={index}
          d={pathData}
          fill={index % 2 === 0 ? "#f4a261" : "#e76f51"} // 교차 색상
          stroke="#333"
          strokeWidth="2"
        />
      );
    });
  };

  const createLabels = () => {
    return sections.map((section, index) => {
      const angle = (index * degreesPerSection + degreesPerSection / 2) * (Math.PI / 180);
      const x = radius + (radius * 0.6) * Math.cos(angle);
      const y = radius - (radius * 0.6) * Math.sin(angle);

      return (
        <text
          key={index}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize="14"
          fontWeight="bold"
        >
          {section}
        </text>
      );
    });
  };

  return (
    <WheelContainer size={size}>
      <svg ref={ref} width={size} height={size}>
        {createSections()}
        {createLabels()}
      </svg>
    </WheelContainer>
  );
});

export default Wheel;

const WheelContainer = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;
