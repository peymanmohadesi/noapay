import styles from './style.module.scss';

function Input(props) {
    const { type, placeholder, value, onChange, id, required, clas, disable } = props;
    var inpC = ""
    if(clas == "inp") {
        inpC = styles.inp;
    }
    return (
        <div className={styles.input_container + " " + inpC}>
            <input
                id={id}
                className={styles.input}
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                readOnly={disable}
            />
            <label>{placeholder} {required == "true" ? <span>*</span> : ""}</label>
        </div>
    );
};

export default Input;
