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
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charecterAllowed, setPassword]);

  return (
    <div className="flex justify-center flex-col items-center mt-14">
      <div className="flex justify-center flex-col items-center bg-gray-700 w-[45%] p-5 rounded-2xl">
        <h1 className="text-white text-2xl">Password Generator</h1>
        <div className=" flex justify-center w-[100%] mt-5">
          <input
            type="text"
            value={password}
            className="bg-white rounded-l-md w-[80%] py-2 px-3 outline-none"
            placeholder="Your Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="text-white bg-blue-500 rounded-r-md p-2 cursor-pointer active:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="flex gap-10 mt-5">
          <div className="flex gap-2">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer text-white"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white">Length: {length} </label>
          </div>

          <div className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">
              NumberAllow
            </label>
          </div>
          <div className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="charecterInput"
              onChange={() => serCharecterAllowed((prev) => !prev)}
            />
            <label htmlFor="charecterInput" className="text-white">
              charecter Allowed
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
