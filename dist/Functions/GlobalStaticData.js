"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const GENDERS = exports.GENDERS = ['male', 'female', 'other'];
const titleNotifications = exports.titleNotifications = ['Hay un nuevo domicilio disponible.',
//  agent
'Un mensajero ha aceptado uno de tus domicilios.',
// customer
'Uno de tus pedidos ha sido actualizado.',
// customer
'Un negocio ha cambiado el estado de uno de tus pedidos.',
// customer
'Un usuario de Delii te está compartiendo una información.',
// customer
'Has recibido un nuevo pedido.',
// place
'Uno de su negocios ha vencido su periodo de actividad.',
// place
'Ha vencido una publicidad de uno de sus negocios.',
// place
'Un cliente ha actualizado un pedido.',
// no implementado
'Un cliente ha notificado el pago a uno de tus domicilios.' // agent
];

const staticCoords = exports.staticCoords = [-75.57793885849603, 6.250513157021833];