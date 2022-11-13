import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert, CardHeader } from 'reactstrap';

const styles = { backgroundColor: '#17A2B8', color: '#ffffff', cursor: 'pointer' };

const EditAppointments = ({ editApt, appointment }) => {
	const [showEdit, setShowEdit] = useState(false);
	const [appointmentEdited, setAppointmentEdited] = useState(appointment);
	const [error, setError] = useState(false);

	const toggleBody = () => {
		setShowEdit(!showEdit);
	};

	const save = e => {
		e.preventDefault();
		if (Object.values(appointmentEdited).some(value => !value)) return setError(true);
		const apt = {
			id: Date.now(),
			patientName: appointmentEdited.patientName,
			patientAge: appointmentEdited.patientAge,
			gender: appointmentEdited.gender,
			aptDate: appointmentEdited.aptDate,
			aptTime: appointmentEdited.aptTime,
			aptNotes: appointmentEdited.aptNotes,
		};
		setAppointmentEdited(apt);
		editApt(apt, appointment.id);
	};
	const handleChange = event => {
		setAppointmentEdited({
			...appointmentEdited,
			[event.target.id]: event.target.value,
		});
	};
	let displayBody = {
		display: showEdit ? 'block' : 'none',
	};
	let errors = {
		display: error ? 'block' : 'none',
	};

	return (
		<Card className="mt-4 mb-4 card-border" outline color="info">
			<CardHeader style={styles} onClick={toggleBody}>
				<i className="fas fa-plus"></i> Editar turno
			</CardHeader>
			<CardBody style={displayBody} id="aptBody">
				<Form onSubmit={save}>
					<FormGroup>
						<Label for="patientName">Nombre completo</Label>
						<Input
							type="text"
							id="patientName"
							placeholder="Nombre del paciente"
							value={appointmentEdited.patientName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="patientAge">Edad</Label>
						<Input
							type="number"
							id="patientAge"
							placeholder="Edad del paciente"
							value={appointmentEdited.patientAge}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="gender">Sexo</Label>
						<Input type="select" id="gender" value={appointmentEdited.gender} onChange={handleChange}>
							<option>Seleccionar sexo</option>
							<option>Masculino</option>
							<option>Femenino</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="aptDate">Fecha</Label>
						<Input type="date" id="aptDate" value={appointmentEdited.aptDate} onChange={handleChange} />
					</FormGroup>
					<FormGroup>
						<Label for="aptTime">Hora</Label>
						<Input type="time" id="aptTime" value={appointmentEdited.aptTime} onChange={handleChange} />
					</FormGroup>
					<FormGroup>
						<Label for="exampleText">Motivo</Label>
						<Input
							type="textarea"
							id="aptNotes"
							placeholder="Motivo del pedido de turno"
							value={appointmentEdited.aptNotes}
							onChange={handleChange}
						/>
					</FormGroup>
					<Alert color="danger" style={errors}>
					Se deben completar todos los campos
					</Alert>
					<Button type="submit" color="primary" block>
						Editar turno
					</Button>
				</Form>
			</CardBody>
		</Card>
	);
};

export default EditAppointments;
