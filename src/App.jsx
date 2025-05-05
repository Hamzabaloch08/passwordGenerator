import { useState, useCallback, useEffect, useRef } from "react";

let App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charecterAllowed, serCharecterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) string += "0123456789";
    if (charecterAllowed) string += "!@#$%^&*-_+=~";

    for (let i = 1; i <= length; i++) {
      let randomPassword = Math.floor(Math.random() * string.length + 1);
      generatedPassword += string.charAt(randomPassword);
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, charecterAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charecterAllowed, setPassword]);

  return (
    <div className="flex justify-center flex-col items-center mt-14 px-4">
      <div className="flex justify-center flex-col items-center bg-gray-700 w-full max-w-xl p-5 rounded-2xl">
        <h1 className="text-white text-2xl text-center">Password Generator</h1>

        <div className="flex flex-col sm:flex-row w-full mt-5">
          <input
            type="text"
            value={password}
            className="bg-white rounded-t-md sm:rounded-tl-md sm:rounded-bl-md sm:rounded-tr-none sm:rounded-br-none w-full py-2 px-3 outline-none"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="text-white bg-blue-500 sm:rounded-tr-md sm:rounded-br-md rounded-b-md p-2 sm:ml-1 mt-2 sm:mt-0 cursor-pointer active:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 mt-5 w-full">
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white whitespace-nowrap">Length: {length} </label>
          </div>

          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">
              Number Allow
            </label>
          </div>

          <div className="flex gap-1 items-center">
            <input
              type="checkbox"
              defaultChecked={charecterAllowed}
              id="charecterInput"
              onChange={() => serCharecterAllowed((prev) => !prev)}
            />
            <label htmlFor="charecterInput" className="text-white">
              Character Allowed
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
