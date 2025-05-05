import { useState, useCallback, useEffect } from "react";

let App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterAllowed, serCharecterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) string += "0123456789";
    if (charecterAllowed) string += "!@#$%^&*-_+=~";

    for (let i = 1; i <= length; i++) {
      let randomPassword = Math.floor(Math.random() * string.length + 1);
      generatedPassword = string.charAt(randomPassword)
    }
  }, [length, numberAllowed, charecterAllowed, setPassword]);

  return (
    <>
      <h1 className="text-white">hello</h1>
    </>
  );
};

export default App;
