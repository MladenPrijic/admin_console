import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';

const ToolBar = props => {
  return (
    <div>
      <Navbar expand="md" className="tool_bar">
          <Nav navbar>
            <NavItem>{props.children}</NavItem>
          </Nav>
      </Navbar>
    </div>
  );
};
export default ToolBar;