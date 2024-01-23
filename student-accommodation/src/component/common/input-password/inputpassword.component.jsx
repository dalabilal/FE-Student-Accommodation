import React, { useState } from 'react';
import './inputpassword.css';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import { EyeClosed } from '@phosphor-icons/react';

/**
 * Renders an input element.
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
 *  label?: string;
 * }} props 
 */
const InputPassword = props => {
  const { label, ...inputProps } = props;
  const [show, setShow] = useState(false);
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
        type={show ? 'text' : 'password'}
      />
      <span 
      style={{ color: '#A3C195' }}
      onClick={() => setShow(!show)}
      className='eye'
      >
        {show ? <Eye size={25} color="#848484" /> : <EyeClosed size={25} color="#848484" />}
      </span>
    </div>
  );
};

export default InputPassword;