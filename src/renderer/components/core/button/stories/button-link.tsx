import * as React from "react"
import Upload from "Renderer/svg/upload.svg"
import { TextDisplayStyle } from "../../text/text.component"
import Button from "../button.component"
import { DisplayStyle } from "../button.config"

import { ButtonHeader, StoryWrapper } from "./styled-elements"

export default () => {
  const clickAlert = () => alert("You clicked me")
  return (
    <StoryWrapper>
      <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        Link, style 1
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.Link1}
        label="Click"
        onClick={clickAlert}
      />
      <Button
        displayStyle={DisplayStyle.Link1}
        label="Click"
        onClick={clickAlert}
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        Link, style 2
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.Link2}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
      />
      <Button
        displayStyle={DisplayStyle.Link2}
        label="I open Google in new tab and have an icon"
        href="http://www.google.pl"
        target="_blank"
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        Link, style 3
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.Link3}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
      />
      <Button
        displayStyle={DisplayStyle.Link3}
        label="I open Google in new tab and have an icon"
        href="http://www.google.pl"
        target="_blank"
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        Link, style 4
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.Link4}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
      />
      <Button
        displayStyle={DisplayStyle.Link4}
        label="I open Google in new tab and have an icon"
        href="http://www.google.pl"
        target="_blank"
        Icon={Upload}
      />
      <ButtonHeader displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
        Link, style Tab
      </ButtonHeader>
      <Button
        displayStyle={DisplayStyle.Tab}
        label="I open Google in new tab"
        href="http://www.google.pl"
        target="_blank"
      />
      <Button
        displayStyle={DisplayStyle.Tab}
        label="I open Google in new tab and have an icon"
        href="http://www.google.pl"
        target="_blank"
        Icon={Upload}
      />
    </StoryWrapper>
  )
}