import styled, { css, keyframes } from 'styled-components';

export const ChartWrapperStyled = styled.div`
  display: flex;
  height: 100%;
`;

const fadeIn = keyframes`
  from { opacity: 0.2; }
  to { opacity: 1 }
`;

const fluidStyles = css`
  height: 100%;
  width: 100%;
`;

const defaultInitialStyle = css`
  opacity: 0.2;
  animation: ${fadeIn} 0.3s;
  animation-fill-mode: forwards;
`;

interface FadeInElement {
  fluid?: boolean;
}

export const FadeInElement = styled.div<FadeInElement>`
  ${defaultInitialStyle}
  ${({ fluid = true }) => fluid && fluidStyles}
`;
