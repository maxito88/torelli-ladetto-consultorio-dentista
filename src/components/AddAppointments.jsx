import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, FormText, Button, Alert } from 'reactstrap';

const styles = { backgroundColor: '#17A2B8', color: '#ffffff', cursor: 'pointer' };


const AddAppointments = ({ saveApt }) => {
	const initialState = {
		patientName: '',
		patientAge: '',
		gender: '',
		aptDate: '',
		aptTime: '',
		aptNotes: '',
	};
	const [newAppointment, setNewAppointment] = useState(initialState);
	const [showBody, setShowBody] = useState(false);
	const [error, setError] = useState(false);

	const toggleBody = () => {
		setShowBody(!showBody);
	};
	const save = e => {
		e.preventDefault();
		if (Object.values(newAppointment).some(value => !value)) return setError(true);
		const apt = {
			id: Date.now(),
			patientName: newAppointment.patientName,
			patientAge: newAppointment.patientAge,
			gender: newAppointment.gender,
			aptDate: newAppointment.aptDate,
			aptTime: newAppointment.aptTime,
			aptNotes: newAppointment.aptNotes,
		};
		setNewAppointment(initialState);
		saveApt(apt);
	};
	const handleChange = event => {
		setNewAppointment({
			...newAppointment,
			[event.target.id]: event.target.value,
		});
	};
	let displayBody = {
		display: showBody ? 'block' : 'none',
	};
	let errors = {
		display: error ? 'block' : 'none',
	};

	return (
		<Card className="mt-4 mb-4 card-border" outline color="info">
			<CardHeader style={styles} onClick={toggleBody}>
				<i className="fas fa-plus"></i> Cargar nuevo turno
			</CardHeader>
			<CardBody style={displayBody} id="aptBody">
				<FormText color="muted" className="mb-1">
					<span className="text-danger">*</span> Todos los campos son requeridos
				</FormText>
				<Form onSubmit={save}>
					<FormGroup>
						<Label for="patientName">Nombre completo</Label>
						<Input
							type="text"
							id="patientName"
							placeholder="Nombre del paciente"
							value={newAppointment.patientName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="patientAge">Edad</Label>
						<Input
							type="number"
							id="patientAge"
							placeholder="Edad del paciente"
							value={newAppointment.patientAge}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="gender">Sexo</Label>
						<Input type="select" id="gender" value={newAppointment.gender} onChange={handleChange}>
							<option>Seleccionar sexo</option>
							<option>Masculino</option>
							<option>Femenino</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="aptDate">Fecha</Label>
						<Input type="date" id="aptDate" value={newAppointment.aptDate} onChange={handleChange} />
					</FormGroup>
					<FormGroup>
						<Label for="aptTime">Hora</Label>
						<Input type="time" id="aptTime" value={newAppointment.aptTime} onChange={handleChange} />
					</FormGroup>
					<FormGroup>
						<Label for="exampleText">Motivo</Label>
						<Input
							type="textarea"
							id="aptNotes"
							placeholder="Motivo del pedido de turno"
							value={newAppointment.aptNotes}
							onChange={handleChange}
						/>
					</FormGroup>
					<Alert color="danger" style={errors}>
						Se deben completar todos los campos
					</Alert>
					<Button type="submit" color="info" block>
						Confirmar turno
					</Button>
				</Form>
			</CardBody>
		</Card>
	);
};

export default AddAppointments;
