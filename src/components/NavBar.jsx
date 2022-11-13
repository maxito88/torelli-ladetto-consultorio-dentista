import React from 'react';
import logo from '../icons8-dentist-64.png';
import { Navbar, NavbarBrand } from 'reactstrap';

const NavBar = () => {
	return (
		<header>
			<Navbar color="secondary">
				<NavbarBrand className="text-white">
					<img src={logo} height="48" className="d-inline-block align-center" alt="logo" />
					<span className="app-title">Centro Odontologico - Turnos</span>
				</NavbarBrand>
			</Navbar>
		</header>
	);
};

export default NavBar;
