import React, { useState } from 'react';
import { InputGroup, InputGroupButtonDropdown, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SearchAppointments = ({ sort, search, orderDir, orderBy }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSort = event => {
		sort(event.target.id, orderDir);
	};

	const handleOrder = event => {
		sort(orderBy, event.target.id);
	};

	const handleSearch = event => {
		search(event.target.value);
	};

	const toggleDropDown = () => {
		setIsOpen(!isOpen);
	};
	return (
		<InputGroup className="mb-3">
			<Input
				id="searchField"
				placeholder="Buscar turnos por nombre y apellido de pacientes"
				type="text"
				className="form-control"
				onChange={handleSearch}
			/>
			<InputGroupButtonDropdown addonType="append" isOpen={isOpen} toggle={toggleDropDown}>
				<DropdownToggle caret color="info">
					Ordenar por
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem onClick={handleSort} id="patientName">
						Nombre {orderBy === 'patientName' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>
					<DropdownItem onClick={handleSort} id="patientAge">
						Edad {orderBy === 'patientAge' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>
					<DropdownItem onClick={handleSort} id="gender">
						Sexo {orderBy === 'gender' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>
					<DropdownItem onClick={handleSort} id="aptDate">
						Fecha {orderBy === 'aptDate' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>					
					<DropdownItem divider />
					<DropdownItem onClick={handleOrder} id="asc">
						Ascendente {orderDir === 'asc' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>
					<DropdownItem onClick={handleOrder} id="desc">
						Descendente {orderDir === 'dsc' ? <span className="fas fa-check"></span> : null}
					</DropdownItem>
				</DropdownMenu>
			</InputGroupButtonDropdown>
		</InputGroup>
	);
};

export default SearchAppointments;
