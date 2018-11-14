import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavigationWrapper = styled.div`
  border: white 1px dotted;
`;

const UlStyle = styled.ul`
  padding: 0;
  list-style: none;
`;

const LiStyle = styled.li`
  display: inline;
  padding: 10px;
`;

function Navigation() {
  return (
    <NavigationWrapper>
      <UlStyle>
        <LiStyle>
          <Link to='/Home'> Home </Link> </LiStyle>
        <LiStyle>
          <Link to='/files'> Files </Link> </LiStyle>
      </UlStyle>
    </NavigationWrapper>
  );
}

export default Navigation;