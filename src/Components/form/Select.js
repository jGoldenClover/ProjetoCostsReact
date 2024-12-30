import styles from "./Select.module.css";

function Select({ text, name, id , options , handleOnChange , value}) {
  return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}</label>
        <select name={name} id={id} onChange={handleOnChange} value={value || ''} >

            <option disabled> Selecione uma opção</option>

            {options.map((option) => {
              return <option value={option.id} key={option.id} >{option.name}</option>
            })}

        </select>
    </div>
  )
}

export default Select;