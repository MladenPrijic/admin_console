import React, { Component } from 'react';
import Header from "../components/header";
import {
    Container
} from 'reactstrap';

class Main extends Component {
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
            <React.Fragment>
                <div id="content-wraper" className="public">
                    {/*header*/}
                    <Container fluid className="nav-container">
                        <Container>
                            <Header />
                        </Container>
                    </Container>
                    <Container className="mt-3" id="page-container">
                        {this.props.children}
                    </Container>

                    {/*footer*/}
                    {/*<Footer/>*/}
                </div>
            </React.Fragment>
        );
    }
}

export default Main;
