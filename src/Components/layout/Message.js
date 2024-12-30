import { useState, useEffect } from "react";

import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // se a mensagem não existir, não exiba
    if (!msg) {
      setVisible(false);
      return;
    }

    // caso contrário exiba a menssagem
    setVisible(true);

    // defino um timer com 3 segundos para deixa-la visivel durante esse momento
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // timer acabou? Deleta ele
    return () => clearTimeout(timer);
  }, [msg]);

  return (
    // Fazendo um if para deixar visivel somente se a visibilidade for = 'true'
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
