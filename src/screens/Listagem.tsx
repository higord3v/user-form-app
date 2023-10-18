import { Text } from "native-base";
import React, { useEffect } from "react";

export const Listagem = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://10.0.2.2/api/usuario", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data);
    })();
  }, []);

  return (
    <>
      {users.map((user) => (
        <Text key={user.id}>
          {user.nome} {user.sobrenome}
        </Text>
      ))}
    </>
  );
};
