import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import React, { Component } from 'react';
import { Route, Switch, NavLink as RRNavLink } from 'react-router-dom';
import NotFound from '../components/NotFound';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import {FaSignOutAlt, FaUserTie} from 'react-icons/fa';
import { IoIosArrowDropleft } from "react-icons/io";
import { MdApps } from 'react-icons/md';
import * as Client from '../Pages/Clients';
import * as User from '../Pages/Users';
import * as Server from '../Pages/Servers';
import * as Software from '../Pages/Software';
import * as CloudProvider from '../Pages/CloudProviders';
import * as ComponentCategorie from '../Pages/ComponentCategories';
import * as Project from '../Pages/Projects';
import * as Deployment from '../Pages/Deployment';
import Profile from '../Pages/Profile';
import * as Comp from '../Pages/Components';
import Auth from '../services/AuthService';

const auth = new Auth();
class Private extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    $('#sidebarCollapse, #mobileCollapse').on('click', function() {
      $('#private').toggleClass('is-collapsed');
      $('.navbar-toggler').toggleClass('d-none');
    });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { email } = auth.getProfile();
    return (
      <React.Fragment>
        <div id="private" className="wrapper is-opened">
          <div className="layout">
              <Navbar id="sidebar">
                  <div className="side-nav-inner">
                      <div className="side-nav-logo">
                          <NavbarBrand href="#">
                              <img
                                  src="/images/logo/logo.png"
                                  alt="ConcordSoft"
                              />
                          </NavbarBrand>
                          <div id="mobileCollapse" className="mobile-toggle side-nav-toggle">
                              <a href="#top">
                                <IoIosArrowDropleft/>
                              </a>
                            </div>
                      </div>
                      <Nav className="components" navbar>
                          <NavItem>
                              <NavLink
                                  to="/project"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Projects
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/deployment"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Deployment
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/client"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Clients
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/component"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Components
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/software"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Software
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/cloud-provider"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Cloud providers
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink
                                  to="/server"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Servers
                              </NavLink>
                          </NavItem>

                          <NavItem>
                              <NavLink
                                  to="/user"
                                  activeClassName="selected"
                                  tag={RRNavLink}
                                  className="nav-link">
                                  Administration
                              </NavLink>
                          </NavItem>
                      </Nav>
                  </div>
              </Navbar>
              {/*Page content*/}
              <div className="content">
                    <Navbar light expand="md" id="private">
                        <div className="header-container">
                            <ul className="nav-left">
                                <li>
                                    <span id="sidebarCollapse">
                                        <MdApps />
                                    </span>
                                </li>
                            </ul>
                            <Nav className="ml-auto nav-right float-right" navbar>
                                <NavItem>
                                    <img
                                        alt=""
                                        className="nav-img-profile"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYyy5LOjrGMJiU4pf6a9PtIpIVovXkxpilFB1ptx46fXrh2_u_dg"
                                    />
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {email}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavLink
                                                to="/profile"
                                                activeClassName="selected"
                                                tag={RRNavLink}
                                                className="nav-link">
                                                <FaUserTie />My Profile
                                            </NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink
                                                to="/logout"
                                                tag={RRNavLink}
                                                className="nav-link">
                                                <FaSignOutAlt />Log Out
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </div>
                    </Navbar>
                    <Container fluid className="main-container">
                      <Switch>
                          <Route exact path="/project" component={Project.List} />
                          <Route exact path="/project/add" component={Project.Add} />
                          <Route
                              exact
                              path="/project/edit/:projectId"
                              component={Project.Edit}
                          />
                          <Route
                              exact
                              path="/project/view/:projectId"
                              component={Project.View}
                          />
                          <Route exact path="/client" component={Client.List} />
                          <Route exact path="/client/add" component={Client.Add} />
                          <Route
                              exact
                              path="/client/edit/:clientId"
                              component={Client.Edit}
                          />
                          <Route
                              exact
                              path="/client/view/:clientId"
                              component={Client.View}
                          />
                          <Route exact path="/user" component={User.List} />
                          <Route exact path="/user/add" component={User.Add} />
                          <Route exact path="/user/edit/:userId" component={User.Edit} />
                          <Route exact path="/user/reset/:userId" component={User.Reset} />
                          <Route exact path="/user/view/:userId" component={User.View} />
                          <Route exact path="/server" component={Server.List} />
                          <Route exact path="/server/add" component={Server.Add} />
                          <Route
                              exact
                              path="/server/edit/:serverId"
                              component={Server.Edit}
                          />
                          <Route
                              exact
                              path="/server/view/:serverId"
                              component={Server.View}
                          />
                          <Route exact path="/deployment" component={Deployment.List} />
                          <Route
                              exact
                              path="/deployment/add"
                              component={Deployment.Add}
                          />
                          <Route
                              exact
                              path="/deployment/edit/:deploymentId"
                              component={Deployment.Edit}
                          />
                          <Route
                              exact
                              path="/deployment/view/:deploymentId"
                              component={Deployment.View}
                          />
                          <Route exact path="/software" component={Software.List} />
                          <Route exact path="/software/add" component={Software.Add} />
                          <Route
                              exact
                              path="/software/edit/:softwareId"
                              component={Software.Edit}
                          />
                          <Route
                              exact
                              path="/software/view/:softwareId"
                              component={Software.View}
                          />
                          <Route
                              exact
                              path="/cloud-provider"
                              component={CloudProvider.List}
                          />
                          <Route
                              exact
                              path="/cloud-provider/add"
                              component={CloudProvider.Add}
                          />
                          <Route
                              exact
                              path="/cloud-provider/edit/:cloudProviderId"
                              component={CloudProvider.Edit}
                          />
                          <Route
                              exact
                              path="/cloud-provider/view/:cloudProviderId"
                              component={CloudProvider.View}
                          />
                          <Route
                              exact
                              path="/component-categorie"
                              component={ComponentCategorie.List}
                          />
                          <Route
                              exact
                              path="/component-categorie/add"
                              component={ComponentCategorie.Add}
                          />
                          <Route
                              exact
                              path="/component-categorie/edit/:componentCategorieId"
                              component={ComponentCategorie.Edit}
                          />
                          <Route
                              exact
                              path="/component-categorie/view/:componentCategorieId"
                              component={ComponentCategorie.View}
                          />
                          <Route exact path="/profile" component={Profile} />
                          <Route exact path="/component" component={Comp.List} />
                          <Route exact path="/component/add" component={Comp.Add} />
                          <Route
                              exact
                              path="/component/edit/:componentId"
                              component={Comp.Edit}
                          />
                          <Route
                              exact
                              path="/component/view/:componentId"
                              component={Comp.View}
                          />

                          <Route component={NotFound} />
                      </Switch>
                    </Container>
                    {/*<Footer />*/}
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Private;
