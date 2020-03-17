import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { OnboardingTroubleshootingProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as ButtonType } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  Title,
} from "Renderer/components/rest/onboarding/onboarding.elements"
import styled from "styled-components"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

const Steps = styled.ol`
  min-width: 59rem;
  text-align: left;
  list-style: none;
  counter-reset: custom-counter;

  > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    counter-increment: custom-counter;

    &:not(:first-of-type) {
      margin-top: 3.2rem;
    }
    &::before {
      content: counter(custom-counter);
      width: 3.2rem;
      height: 3.2rem;
      margin-right: 3.2rem;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background-color: ${backgroundColor("lightBlue")};
      box-shadow: 0 0.5rem 1rem 0 #00000019;
    }
  }

  ul {
    padding-left: 3.2rem;
    margin-left: 3.2rem;
    list-style-type: disc;

    li {
      margin-left: 1.6rem;
      padding-left: 0;
      margin-top: 0.8rem;
      line-height: 2.4rem;
    }
  }
`

const OnboardingTroubleshooting: FunctionComponent<OnboardingTroubleshootingProps> = ({
  onRetry = noop,
}) => {
  return (
    <OnboardingWrapper>
      <header>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "view.name.onboarding.troubleshooting.title",
            values: {
              bold: (...chunks) => <strong>{chunks}</strong>,
            },
          }}
        />
        <Text
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "view.name.onboarding.troubleshooting.instruction" }}
        />
      </header>
      <main>
        <Steps>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "view.name.onboarding.troubleshooting.steps.1" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "view.name.onboarding.troubleshooting.steps.2" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "view.name.onboarding.troubleshooting.steps.3" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "view.name.onboarding.troubleshooting.steps.4" }}
          />
          <ul>
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.MediumFadedText}
              message={{ id: "view.name.onboarding.troubleshooting.steps.4.a" }}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.MediumFadedText}
              message={{ id: "view.name.onboarding.troubleshooting.steps.4.b" }}
            />
          </ul>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "view.name.onboarding.troubleshooting.steps.5" }}
          />
        </Steps>
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "view.name.onboarding.troubleshooting.button",
          })}
          onClick={onRetry}
        />
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingTroubleshooting
