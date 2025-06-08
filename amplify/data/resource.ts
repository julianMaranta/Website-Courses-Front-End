import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Usuario: a
    .model({
      nombre: a.string().required(),
      correo: a.string().required(),
      dni: a.string(), // Nuevo campo para el D.N.I.
      cuil: a.string(), // Nuevo campo para el CUIL
      tramite: a.string(), // Nuevo campo para el Número de Trámite
      contrasena: a.string().required(),
      rol: a.enum(["Estudiante", "Administrador", "Profesor"]),
      cursosComprados: a.hasMany("CursoComprado", "usuarioId"),
      especializacionesCompradas: a.hasMany("EspecializacionComprada", "usuarioId"),
      tutoriasCompradas: a.hasMany("TutoriaComprada", "usuarioId"),
      certificadosComprados: a.hasMany("CertificadoComprado", "usuarioId"), // Nuevo campo para certificados comprados
      comprobantes: a.hasOne("Comprobante", "usuarioId") // Relación hasOne con el campo usuarioId
     
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Comprobante: a
    .model({
      usuarioId: a.id().required(), // Relación con el usuario que subió el comprobante
      usuario: a.belongsTo("Usuario", "usuarioId"), // Relación belongsTo con Usuario
      comprobanteLink: a.string().required(), // Enlace del comprobante subido (Dropbox)
      email: a.string(),
      tipoPago: a.string(), // Tipo de pago: Transferencia o MercadoPago
      tipoEntidad: a.string(), 
      nombreSeleccionado: a.string(), // Nombre del Curso, Especialización o Tutoría
      estado: a.enum(["pendiente", "aprobado", "rechazado"]), // No se usa default
      
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Curso: a
    .model({
      nombre: a.string().required(),
      descripcion: a.string(),
      linkPago: a.string(),
      driveLink: a.string(),
      profesores: a.string().array(), // Se cambia para almacenar múltiples profesores
      cantidadDeAlumnos: a.integer().required(),
      clases: a.hasMany("Clase", "cursoId"),
      cursosComprados: a.hasMany("CursoComprado", "cursoId"),
      videoUrl: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Especializacion: a
    .model({
      nombre: a.string().required(),
      descripcion: a.string(),
      imagen: a.string(),
      linkPago: a.string(),
      driveLink: a.string(),
      profesores: a.string().array(), // Se cambia para almacenar múltiples profesores
      cantidadDeAlumnos: a.integer().required(),
      clases: a.hasMany("Clase", "especializacionId"),
      especializacionesCompradas: a.hasMany("EspecializacionComprada", "especializacionId"),
      videoUrl: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Tutoria: a
    .model({
      nombre: a.string().required(),
      descripcion: a.string(),
      driveLink: a.string(),
      profesores: a.string().array(), // Se cambia para almacenar múltiples profesores
      cantidadDeAlumnos: a.integer().required(),
      clases: a.hasMany("Clase", "tutoriaId"),
      videoUrl: a.string(),
      
      tutoriasCompradas: a.hasMany("TutoriaComprada", "tutoriaId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Clase: a
    .model({
      nombre: a.string().required(),
      tematica: a.string().required(),
      cursoId: a.id(), // Opcional si la clase pertenece a un curso
      curso: a.belongsTo("Curso", "cursoId"),
      especializacionId: a.id(), // Opcional si la clase pertenece a una especialización
      especializacion: a.belongsTo("Especializacion", "especializacionId"),
      tutoriaId: a.id(), // Opcional si la clase pertenece a una tutoría
      tutoria: a.belongsTo("Tutoria", "tutoriaId"),
      fecha: a.date(), // Campo requerido para la fecha de la clase
      hora: a.time(), // Campo requerido para la hora de la clase
      youtubeVideoUrl: a.string(),
      imagenes: a.json(), // Cambiado de string a json para almacenar enlaces y títulos
      texto: a.string(),
      zoomLink: a.string(), // Nuevo campo para el link de Zoom
      driveLinkClase: a.string(),
      pdfClase: a.string(), 
      index: a.integer(), // Nuevo campo para almacenar un índice
      
    })
    .authorization((allow) => [allow.publicApiKey()]),

  CursoComprado: a
    .model({
      usuarioId: a.id().required(),
      cursoId: a.id().required(),
      usuario: a.belongsTo("Usuario", "usuarioId"),
      curso: a.belongsTo("Curso", "cursoId"),
      usuarioNombre: a.string(),  // Nuevo campo
      usuarioCorreo: a.string(),  // Nuevo campo
    })
    .authorization((allow) => [allow.publicApiKey()]),

  EspecializacionComprada: a
    .model({
      usuarioId: a.id().required(),
      especializacionId: a.id().required(),
      usuario: a.belongsTo("Usuario", "usuarioId"),
      especializacion: a.belongsTo("Especializacion", "especializacionId"),
      usuarioNombre: a.string(),  // Nuevo campo
      usuarioCorreo: a.string(),  // Nuevo campo
    })
    .authorization((allow) => [allow.publicApiKey()]),

  TutoriaComprada: a
    .model({
      usuarioId: a.id().required(),
      tutoriaId: a.id().required(),
      usuario: a.belongsTo("Usuario", "usuarioId"),
      tutoria: a.belongsTo("Tutoria", "tutoriaId"),
      usuarioNombre: a.string(),  // Nuevo campo
      usuarioCorreo: a.string(),  // Nuevo campo
    })
    .authorization((allow) => [allow.publicApiKey()]),

    Certificado: a
    .model({
      nombre: a.string().required(),
      destinatario: a.string().required(),
      dniDestinatario: a.string(), // Nuevo campo para el DNI del destinatario
      fechaDeEmision: a.date().required(),
      cursoNombre: a.string().required(),
      certificadosComprados: a.hasMany("CertificadoComprado", "certificadoId") // Relación inversa añadida
     
    })
    .authorization((allow) => [allow.publicApiKey()]),

    CertificadoComprado: a
    .model({
      usuarioId: a.id().required(),
      certificadoId: a.id().required(),
      usuario: a.belongsTo("Usuario", "usuarioId"),
      certificado: a.belongsTo("Certificado", "certificadoId"),
      usuarioNombre: a.string(),  // Campo para el nombre del usuario
      usuarioCorreo: a.string(),  // Campo para el correo del usuario
    })
    .authorization((allow) => [allow.publicApiKey()]),

});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

 
