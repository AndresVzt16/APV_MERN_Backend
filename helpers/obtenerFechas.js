const fechaActual = () => {
    // Obtener la fecha y hora actual en formato UTC
    const fechaUTC = new Date();

    // Obtener el desplazamiento de tiempo para Ecuador (UTC-5)
    const offsetEcuador = -5 * 60; // El desplazamiento se mide en minutos

    // Aplicar el desplazamiento de tiempo para obtener la fecha y hora local de Ecuador
    const fechaEcuador = new Date(fechaUTC.getTime() + offsetEcuador * 60 * 1000);

    // Devolver la fecha formateada en formato ISO 8601
    return fechaEcuador.toISOString();
}


export default fechaActual