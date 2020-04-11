let error = (err, res, mensaje = '', errStatus = 400) => {
    if (err) {
        return res.status(errStatus).json({
            ok: false,
            err
        });
    } else if (mensaje != '') {
        return res.status(errStatus).json({
            ok: false,
            err: {
                message: mensaje
            }
        });
    }

    return true;
}

module.exports = {
    error
};