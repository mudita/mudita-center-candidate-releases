import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { URL_MAIN } from "Renderer/constants/urls"

const NavigationWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`

const LinkWrapper = styled.div`
  margin: 0 10px;
`

const Navigation = () => {
  const links = Object.entries(URL_MAIN).map(([link, url]) => {
    return (
      <LinkWrapper key={link}>
        <Link to={url}>{link}</Link>
      </LinkWrapper>
    )
  })
  return <NavigationWrapper>{links}</NavigationWrapper>
}

export default Navigation