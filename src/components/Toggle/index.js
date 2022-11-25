import styles from './style.module.scss';
import { useState } from "react";

function Toggle(props) {
    const { checked, onChange, id } = props;

    const [check, setCheck] = useState(checked)

    const unCheck = () => {
        setCheck(false);
    }

    return (
        
        <label className={styles.switch}>
            {check == true ? <input id={id} onClick={unCheck} onChange={onChange} type='checkbox' checked/> : <input id={id}  onChange={onChange} type='checkbox'/>}
            
            <span className={styles.slider + " " + styles.round}></span>
        </label>
    );
};

export default Toggle;