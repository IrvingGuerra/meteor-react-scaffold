import { Meteor } from 'meteor/meteor';

const Permissions = {
	PERMISSIONS: {
		LIST: { VALUE: 'permissions-view', TEXT: 'Listar permisos' }
	},
	USERS: {
		LIST: { VALUE: 'users-view', TEXT: 'Listar usuarios' },
		CREATE: { VALUE: 'users-create', TEXT: 'Crear usuario' },
		UPDATE: { VALUE: 'users-edit', TEXT: 'Actualizar usuario' },
		DELETE: { VALUE: 'users-delete', TEXT: 'Eliminar usuario' }
	},
	PROFILES: {
		LIST: { VALUE: 'profiles-view', TEXT: 'Listar perfiles' },
		CREATE: { VALUE: 'profiles-create', TEXT: 'Crear perfil' },
		UPDATE: { VALUE: 'profiles-edit', TEXT: 'Actualizar perfil' },
		DELETE: { VALUE: 'profiles-delete', TEXT: 'Eliminar perfil' }
	},
	TEMPLATES: {
		LIST: { VALUE: 'templates-view', TEXT: 'Listar plantillas' },
		CREATE: { VALUE: 'templates-create', TEXT: 'Crear plantilla' },
		UPDATE: { VALUE: 'templates-edit', TEXT: 'Actualizar plantilla' },
		DELETE: { VALUE: 'templates-delete', TEXT: 'Eliminar plantilla' }
	},
	ORDERS: {
		LIST: { VALUE: 'analyses-view', TEXT: 'Listar analices' },
		CREATE: { VALUE: 'analyses-create', TEXT: 'Crear analisis' },
		UPDATE: { VALUE: 'analyses-edit', TEXT: 'Actualizar analisis' },
		DELETE: { VALUE: 'analyses-delete', TEXT: 'Eliminar analisis' }
	},
	SPECIES: {
		LIST: { VALUE: 'species-view', TEXT: 'Listar especies' },
		CREATE: { VALUE: 'species-create', TEXT: 'Crear especie' },
		UPDATE: { VALUE: 'species-edit', TEXT: 'Actualizar especie' },
		DELETE: { VALUE: 'species-delete', TEXT: 'Eliminar especie' }
	},
	BREEDS: {
		LIST: { VALUE: 'breeds-view', TEXT: 'Listar razas' },
		CREATE: { VALUE: 'breeds-create', TEXT: 'Crear raza' },
		UPDATE: { VALUE: 'breeds-edit', TEXT: 'Actualizar raza' },
		DELETE: { VALUE: 'breeds-delete', TEXT: 'Eliminar raza' }
	},
}

export const permissionsArray = Object.keys(Permissions).reduce((accumulator, systemModuleName) => {
	const systemModuleObject = Permissions[systemModuleName];
	const modulePermissions = Object.keys(systemModuleObject).map(permission => {
		return {
			value: systemModuleObject[permission].VALUE,
			text: systemModuleObject[permission].TEXT
		};
	});
	return accumulator.concat(modulePermissions);
}, []);
if (Meteor.isDevelopment) {
	console.info('Updating permissions.');
	const currentRoles = Roles.getAllRoles().fetch();
	permissionsArray.map(permissionObject => {
		if (!currentRoles.find(_role => _role._id === permissionObject.value)) {
			Roles.createRole(permissionObject.value);
		}
		Meteor.roles.update(permissionObject.value, {
			$set: {
				publicName: permissionObject.text
			}
		});
	});
}

export default Permissions;
