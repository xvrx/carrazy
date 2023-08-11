import React from 'react'
import './input.css'

export const Inputx = ({title,refer,disabled, readOnly, type, max, className, onChange, value,onBlur, onClick}) => {
  return (
    <div className={`tunggakan-modal-${className}`}>
        <div className={`modal-${className}-input-container`}>
            <input
                readOnly={readOnly}
                disabled={disabled}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={refer}
                onClick={onClick}
                autoComplete="off"
                spellCheck="false"
                className={`modal-${className}-input`}
                type={type}
                maxLength={max}
                id={`modal-${className}-input`}
                required
            />
            <label
                id={`modal-${className}-input-label`}
                className={`${className}-modal-text`}
                htmlFor={`modal-${className}-input`}
            >{title}
            </label>
            <label
                id={`modal-${className}-input-garis`}
                className={`${className}-modal-line`}
                htmlFor={`modal-${className}-input`}
            ></label>
        </div>
    </div>
  )
}

export const Inputa = ({title,maxLength, type="text", className, onChange, value,onBlur, onClick}) => {
  return (
    <div className={`tunggakan-modal-${className}`}>
        <div className={`modal-${className}-input-container`}>
            <textarea
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                onClick={onClick}
                maxLength={maxLength}
                autoComplete="off"
                spellCheck="false"
                className={`modal-${className}-input`}
                type={type}
                id={`modal-${className}-input`}
                required
            />
            <label
                id={`modal-${className}-input-label`}
                className={`${className}-modal-text`}
                htmlFor={`modal-${className}-input`}
            >{title}
            </label>
            <label
                id={`modal-${className}-input-garis`}
                className={`${className}-modal-line`}
                htmlFor={`modal-${className}-input`}
            ></label>
        </div>
    </div>
  )
}
