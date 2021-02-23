import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';


const Header = () => {
    return (
        <Nav justified style={{
                    marginTop: 20,
                    marginBottom: 20
                }}>
            <NavItem className="text-left"  tag='h4'>
                <Link className="text-white" to='/'>Game of Thrones DB</Link> 
            </NavItem>
            <Nav>
                <NavItem>
                    <Link className="text-white" to='/characters'>Characters</Link>
                </NavItem>
                <NavItem style={{
                    marginRight: 30,
                    marginLeft: 30
                }}>
                    <Link  className="text-white" to='/houses'>Houses</Link>
                </NavItem>
                <NavItem>
                    <Link className="text-white" to='/books/'>Books</Link>
                </NavItem>
            </Nav>
        </Nav>
    );
};

export default Header;