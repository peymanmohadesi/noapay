import styles from './style.module.scss';

function Button(props) {
    const { text, onClick, disabledT } = props;

    return (
        <button
            className={styles.btn}
            onClick={onClick}
            disabled={disabledT}
        >{text}</button>
    );
};

export default Button;