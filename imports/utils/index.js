export const getStatusSpanish = (status) => {
	switch (status) {
		case 'open':
			return 'Abierto';
		case 'awaitingSample':
			return 'En espera de muestra';
		case 'process':
			return 'En proceso';
		case 'awaitingResults':
			return 'En espera de resultados';
		case 'attended':
			return 'Atendido';
	}
}
