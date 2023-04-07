export const formatDate = (dateString: Date) => {
	const now = new Date().getTime();
	const date = new Date(dateString).getTime();
	const diff = now - date;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	switch (true) {
		case seconds < 60:
			return "há menos de um minuto";
		case minutes === 1:
			return "há um minuto";
		case minutes < 60:
			return `há ${minutes} minutos`;
		case hours === 1:
			return "há uma hora";
		case hours < 24:
			return `há ${hours} horas`;
		case days === 1:
			return "ontem";
		default:
			const date = new Date(dateString);
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `em ${day}/${month}/${year}`;
	}
};
