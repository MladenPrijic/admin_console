import React from 'react';
import {
    Navbar,
    NavbarBrand

} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand href="#"><img src="/images/logo/logo.png" alt="ConcordSoft"/></NavbarBrand>
                </Navbar>
            </div>
        );
    }
}



export default Header;