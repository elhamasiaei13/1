import React from 'react';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';


const Header = ({ isLogged, logoutHandler, userName }) => (
	<Navbar inverse fixedTop collapseOnSelect componentClass="header" >

		<Navbar.Header >
			<Navbar.Brand >
				روان آگاهی
			</Navbar.Brand>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav>
				<LinkContainer to="/" exact>
					<NavItem eventKey={1}>
					<i className="fa fa-home" >&nbsp;&nbsp;</i>					
						صفحه اصلی
					</NavItem>
				</LinkContainer >
				<LinkContainer to="/surveys">
					<NavItem eventKey={2}>
						{/* <i className="fa fa-th" >&nbsp;&nbsp;</i> */}
						<i className="fa fa-files-o" >&nbsp;&nbsp;</i>						
						آزمون ها
					</NavItem>
				</LinkContainer>
			</Nav>
			{isLogged ?
				<Nav pullLeft>
					<LinkContainer to="/logout" >
						<NavItem eventKey={3} onClick={() => logoutHandler()}>
							<i className="fa fa-sign-out" >&nbsp;&nbsp;</i>
							خروج
						</NavItem>
					</LinkContainer>
					{/* <LinkContainer to="/login"> */}

					{/* </LinkContainer> */}
				</Nav>
				:
				<Nav >
					<LinkContainer to="/register">
						<NavItem eventKey={3}>
							<i className="fa fa-address-card" >&nbsp;&nbsp;</i>
							ثبت نام
						</NavItem>
					</LinkContainer>
					<LinkContainer to="/login">
						<NavItem eventKey={4}>
							<i className="fa fa-sign-in" >&nbsp;&nbsp;</i>
							ورود
						</NavItem>
					</LinkContainer>
				</Nav>
			}
			<Nav pullLeft>
				<LinkContainer to="/profile">
					<NavItem eventKey={3}>
						{isLogged ? 
							`${userName} خوش آمدید` 
							: 
							null}
					</NavItem>
				</LinkContainer>
			</Nav>
			{/* <Navbar.Text pullLeft>
				{isLogged ? `${userName} خوش آمدید` : null}
			</Navbar.Text> */}
		</Navbar.Collapse>
	</Navbar>

);

Header.propTypes = {
	isLogged: PropTypes.bool.isRequired,
	logoutHandler: PropTypes.func.isRequired,
	userName: PropTypes.string,
};

export default Header;  