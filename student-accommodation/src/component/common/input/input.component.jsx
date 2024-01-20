import React from 'react';
import './input.css';

/**
 * Renders an input element.
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
 *  label?: string;
 * }} props 
 */
const Input = props => {
  const { label, ...inputProps } = props;
  const style = {
    height: `${props.height ? props.height : props.Type === 'textArea' ? '80' : '30'}px`,
    width: `${props.width ? props.width : props.Type === 'text' ? '300' : '300'}px`,
    borderRadius: `${props.radius ? props.radius : '15'}px`,
    fontWeight: `${props.FontWeight ? props.FontWeight : 'normal'}`,
    fontSize: `${props.FontSize ? props.FontSize : '14'}px`,
    borderColor: `${props.Status === false
        ? '#A3C195'
        : props.Color
            ? props.Color
            : '#A3C195'
        }`,
};

  return (
    <div className="input-group">
      {
        label ? (
          <label>
            <span>{label}</span>
            &nbsp;
            {inputProps.required && <span>*</span>}
          </label>
        ) : null
      }
      <input {...inputProps}
       style={style}
      />
    </div>
  );
};

export default Input;