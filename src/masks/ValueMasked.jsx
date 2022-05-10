/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CurrencyInput from 'react-currency-masked-input'

export default function ValueMasked({callback, loading}) {
    return (
        <CurrencyInput {...callback('value')} placeholder="Valor" disabled={loading} required />
    )
}