import styles from './style.module.scss';
import { useEffect } from "react";

function Message(props) {
    const { msg, type, id } = props;

    useEffect(() => {
        const addMessageState = [
            { transform: 'translateX(-253px)' },
            { transform: 'translateX(0px)' }
        ];

        const removeMessageState = [
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-253px)' }
        ];

        const newspaperTiming = {
            duration: 300,
            iterations: 1,
        }
        document.getElementById(id).style.opacity = 1;
        document.getElementById(id).animate(addMessageState, newspaperTiming);
        setTimeout(() => {
            document.getElementById(id).animate(removeMessageState, newspaperTiming);

            setTimeout(() => {
                document.getElementById(id).style.opacity = 0;
            }, 300);
        }, 5000);
    })

    return (
        <div id={id} className={styles.container}>
            <div id="test" className={styles[type]}>
                {msg}
            </div>
        </div>
    );
};

export default Message;
