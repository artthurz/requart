import "./styles.css"
import React from "react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2'
import _ from 'lodash'

const OpConfirmation = ({
                            title = '',
                            message = '',
                            onConfirm = _.noop,
                            level = 'error',
                            html = null,
                            confirmText = "Sim",
                            cancelText = "Não",
                        }) => {
    Swal.fire({
            title: title,
            text: message,
            icon: level,
            html: html,
            showCancelButton: true,
            confirmButtonColor: level === 'error' ? "#DD6B55" : (level === 'warning' ? 'FFA500' : ''),
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
        },
    ).then((result) => {
        if (result.value) {
            onConfirm()
        }
    })
};

OpConfirmation.propTypes = PropTypes.shape({
    msg: PropTypes.object,
    title: PropTypes.string,
    message: PropTypes.string,
    level: PropTypes.string,
    onConfirm: PropTypes.func,
});

export default OpConfirmation;