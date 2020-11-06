import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const name = 'LABVETANALIZA';
const email = '<guerravargasirvinggo@gmail.com>';
const from = `${ name } ${ email }`;

Accounts.emailTemplates.siteName = name;
Accounts.emailTemplates.from = from;
const emailTemplates = Accounts.emailTemplates;

Accounts.generateOptionsForEmail = (email, user, url, reason) => {
	const options = {
		to: email,
		from: Accounts.emailTemplates[reason].from
			? Accounts.emailTemplates[reason].from(user)
			: Accounts.emailTemplates.from,
		subject: Accounts.emailTemplates[reason].subject(user)
	};

	if (typeof Accounts.emailTemplates[reason].text === 'function') {
		options.text = Accounts.emailTemplates[reason].text(user, url);
	}

	if (typeof Accounts.emailTemplates[reason].html === 'function') {
		options.html = Accounts.emailTemplates[reason].html(user, url);
	}

	if (typeof Accounts.emailTemplates[reason].attachments === 'function') {
		options.attachments = Accounts.emailTemplates[reason].attachments();
	}

	if (typeof Accounts.emailTemplates.headers === 'object') {
		options.headers = Accounts.emailTemplates.headers;
	}

	return options;
};

// Reset Password
emailTemplates.resetPassword = {
	subject() {
		return `Restablece tu contraseña`;
	},
	html(user, url) {
		const urlWithoutHash = url.replace('#/', '');
		if (Meteor.isDevelopment) console.info(`Password reset link: ${ urlWithoutHash }`);
		const emailBody = `Recibimos tu solicitud para restablecer de tu contraseña. Visita el siguiente link: ${urlWithoutHash}.\n\n
        Si no solicitaste este restablecimiento, por favor ignora este correo.`
		return emailBody;
	}
};


//Activate the service of Mails.
if (Meteor.isDevelopment) {
	if (Meteor.settings.private && Meteor.settings.private.MAIL_URL) {
		process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
		process.env.ROOT_URL = Meteor.settings.private.ROOT_URL;
	} else {
		console.warn('[ANALIZA] - Email settings are not configured. Emails will not be sent. ');
	}
}
