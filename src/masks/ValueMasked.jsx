/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CurrencyInput from 'react-currency-masked-input'

// const regex = "^\d*\.?\d{1,2}$";

export default function ValueMasked({callback}) {
    return (
        <CurrencyInput {...callback('value')} placeholder="Valor" separator="," required />
    )
}