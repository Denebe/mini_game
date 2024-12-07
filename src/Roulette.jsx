import React, { useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const Roulette = ({ sections, size = 400 }) => {
  const wheelRef = useRef(null);
  const fixedPointRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    const spins = Math.floor(Math.random() * 5) + 5; // 5~10 바퀴
    const randomDegree = Math.random() * 360; // 랜덤 회전 각도
    const totalDegrees = spins * 360 + randomDegree;

    gsap.to(wheelRef.current, {
      rotation: totalDegrees,
      duration: 3,
      ease: "power3.out",
      onComplete: () => {
        // FixedPoint 좌표 계산
        const fixedPointRect = fixedPointRef.current.getBoundingClientRect();
        const fixedPointX = fixedPointRect.x + fixedPointRect.width / 2;
        const fixedPointY = fixedPointRect.y + fixedPointRect.height / 2;

        // 히트박스와 FixedPoint의 충돌 확인
        const hitboxes = document.querySelectorAll("[data-value]");
        let detectedValue = null;

        hitboxes.forEach((hitbox) => {
          const hitboxRect = hitbox.getBoundingClientRect();
          const hitboxX = hitboxRect.x + hitboxRect.width / 2;
          const hitboxY = hitboxRect.y + hitboxRect.height / 2;
          const radius = 80; // 히트박스 반지름

          // FixedPoint와 히트박스 중심 간 거리 계산
          const distance = Math.sqrt(
            Math.pow(fixedPointX - hitboxX, 2) + Math.pow(fixedPointY - hitboxY, 2)
          );

          if (distance <= radius) {
            detectedValue = hitbox.dataset.value; // 충돌한 히트박스 값 가져오기
          }
        });

        if (detectedValue) {
          setWinner(detectedValue); // 당첨자 설정
        } else {
          setWinner("룰렛을 다시 돌려주세요");
        }

        setIsSpinning(false);
      },
    });
  };

  const degreesPerSection = 360 / sections.length;

  return (
    <Container>
      <WheelContainer>
        <svg
          ref={wheelRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transformOrigin: "center" }}
        >
          {sections.map((section, index) => {
            const startAngle = index * degreesPerSection;
            const endAngle = startAngle + degreesPerSection;

            const largeArcFlag = degreesPerSection > 180 ? 1 : 0;

            const x1 = size / 2 + (size / 2) * Math.cos((startAngle * Math.PI) / 180);
            const y1 = size / 2 - (size / 2) * Math.sin((startAngle * Math.PI) / 180);

            const x2 = size / 2 + (size / 2) * Math.cos((endAngle * Math.PI) / 180);
            const y2 = size / 2 - (size / 2) * Math.sin((endAngle * Math.PI) / 180);

            const labelX = size / 2 + (size / 3) * Math.cos(((startAngle + endAngle) / 2) * (Math.PI / 180));
            const labelY = size / 2 - (size / 3) * Math.sin(((startAngle + endAngle) / 2) * (Math.PI / 180));

            return (
              <g key={index}>
                {/* 섹션 표시 */}
                <path
                  d={`M${size / 2},${size / 2} L${x1},${y1} A${size / 2},0 0 ${largeArcFlag} 1 ${x2},${y2} Z`}
                  fill={index % 2 === 0 ? "#f4a261" : "#e76f51"}
                />
                {/* 히트박스 */}
                <circle
                  cx={labelX}
                  cy={labelY}
                  r="80" // 히트박스 크기
                  fill='transparent'
                  data-value={section}
                />
                {/* 라벨 텍스트 */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#333"
                >
                  {section}
                </text>
              </g>
            );
          })}
        </svg>
        <FixedPoint ref={fixedPointRef} size={size} />
      </WheelContainer>
  
  <Button  onClick={spinRoulette} disabled={isSpinning}>
        Spin
      </Button>
      {winner && <Winner>🎉 Winner: {winner} 🎉</Winner>}
    </Container>
  );
};

export default Roulette;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const WheelContainer = styled.div`
  position: relative;
`;

const FixedPoint = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: ${({ size }) => size / 2 - (size / 3) - 5}px;
  left: ${({ size }) => size / 2 - 5}px;
  z-index: 10;
`;

const Button = styled.button`
  margin-top: 100px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
`;

const Winner = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
