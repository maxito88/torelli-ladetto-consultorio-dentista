import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar';
import AddAppointments from './components/AddAppointments';
import SearchAppointments from './components/SearchAppointments';
import ListAppointments from './components/ListAppointments';

const App = () => {
	const [appointments, setAppointments] = useState({
		appointments: [],
		showAddBody: false,
		orderBy: 'patientName',
		orderDir: 'asc',
		searchText: '',
	});

	useEffect(() => {
		fetch('./data.json')
			.then(res => res.json())
			.then(data =>
				setAppointments({
					...appointments,
					appointments: data,
				})
			)
			.catch(error => console.log('Hubo un problema obteniendo los turnos.'));
	}, []);
//}, );

	const saveAppointment = newAppointment => {
		const apts = appointments.appointments;
		apts.push(newAppointment);
		setAppointments({
			...appointments,
			appointments: apts,
		});
	};

	const editAppointment = (appointment, id) => {
		const apts = appointments.appointments;
		const aptToDelete = apts.find(apt => apt.id === id);
		console.log(aptToDelete);
		const newApts = _.without(apts, aptToDelete);
		newApts.push(appointment);
		setAppointments({
			...appointments,
			appointments: newApts,
		});
	};

	const deleteAppointment = aptId => {
		const apts = appointments.appointments;
		const aptToDelete = _.find(apts, _.matchesProperty('id', parseInt(aptId, 10)));
		const newApts = _.without(apts, aptToDelete);
		setAppointments({
			...appointments,
			appointments: newApts,
		});
	};

	const sort = (orderBy, orderDir) => {
		setAppointments({
			...appointments,
			orderBy: orderBy,
			orderDir: orderDir,
		});
	};

	const search = query => {
		setAppointments({
			...appointments,
			searchText: query,
		});
	};

	let filteredApts = [];
	const { orderBy, orderDir, searchText, appointments: apts } = appointments;

	apts.forEach(item => {
		if (item.patientName.toLowerCase().indexOf(searchText) !== -1) {
			filteredApts.push(item);
		}
	});

	filteredApts = _.orderBy(filteredApts, orderBy, orderDir);

	return (
		<>
			<NavBar />
			<Container>
				<AddAppointments saveApt={saveAppointment} />
				<SearchAppointments
					sort={sort}
					search={search}
					orderBy={appointments.orderBy}
					orderDir={appointments.orderDir}
				/>
				<ListAppointments appointments={filteredApts} editApt={editAppointment} onDelete={deleteAppointment} />
			</Container>
		</>
	);
};

export default App;
