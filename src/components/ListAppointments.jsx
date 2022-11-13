import React from 'react';
import { Media, Button } from 'reactstrap';
import EditAppointments from './EditAppointments';

const ListAppointments = ({ appointments, onDelete, editApt }) => {
	const handleDelete = event => {
		onDelete(event.target.id);
	};

	return (
		<ul>
			{appointments.length
				? appointments.map(item => {
						return (
							<>
								<li
									className="p-1 card-border shadow-sm p-3 mb-3 bg-white rounded"
									style={{ borderRadius: '0.25rem' }}
									key={item.id}
								>
									<Media>
										<Media left top>
											<Button color="danger" className="mr-3 delete-btn">
												<i id={item.id} onClick={handleDelete} className="fas fa-times"></i>
											</Button>
										</Media>
										<Media body>
											<Media heading className="m-0">
												{item.patientName}
											</Media>
											<p className="mt-4 mb-0">
												<span className="font-weight-bold">Edad:</span> {item.patientAge}
												<br />
												<span className="font-weight-bold">Sexo:</span> {item.gender}
											</p>
											<p>
												<span className="font-weight-bold">Motivo:</span> {item.aptNotes}
											</p>
											<p className="mb-0">
												<span className="font-weight-bold">Fecha del turno:</span> &nbsp;
												{new Date(item.aptDate).toLocaleDateString()} a las {item.aptTime} hs
											</p>
										</Media>
									</Media>
									<EditAppointments editApt={editApt} appointment={item} />
								</li>
							</>
						);
				  })
				: 'No se encontraron turnos cargados'}
		</ul>
	);
};

export default ListAppointments;
