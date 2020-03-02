import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

const fadeAnimation = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation-name: fadeIn;
  animation-duration: ${transitionTime("faster")};
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-timing-function: ${transitionTimingFunction("easeInOut")};
`

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 2;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  ${fadeAnimation};
  animation-duration: ${transitionTime("veryQuick")};
`

export const ModalWrapper = styled.section`
  position: fixed;
  z-index: 3;

  display: flex;
  flex-direction: column;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 2rem;
  box-sizing: border-box;

  border-radius: 0.4rem;
  background-color: ${backgroundColor("light")};
  box-shadow: 0 0.2rem 3rem 0 rgba(0, 0, 0, 0.08);

  ${fadeAnimation};
`