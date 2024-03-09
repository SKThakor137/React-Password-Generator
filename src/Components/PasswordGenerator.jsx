import { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator2 = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isChar, setIsChar] = useState(true);
  const [isNumber, setIsNumber] = useState(true);
  const [isSpecial, setIsSpecial] = useState(true);

  const passwordRef = useRef(null);

  const passWordGenerate = useCallback(() => {
    let str = "";
    const charStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbChar = "0123456789";
    const specialChar = "!@#$%^&*";

    if (isChar) str += charStr;
    if (isNumber) str += numbChar;
    if (isSpecial) str += specialChar;

    let pass = "";
    for (let index = 1; index <= length; index++) {
      const random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, isChar, isNumber, isSpecial]);

  const copyPassword = () => {
    if (password.length === 0) {
      alert("Not Password");
    } else {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
    }
  };

  useEffect(() => {
    passWordGenerate();
  }, [length, isChar, isNumber, isSpecial]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-6">Password Generator</h2>
        <div className="mb-4 relative flex justify-between">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            readOnly
          />
          <button
            className="absolute inset-y-0 right-0 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="rangeInput"
            className="block text-sm font-medium text-gray-700"
          >
            Select Length: {length}
          </label>
          <input
            type="range"
            id="rangeInput"
            name="rangeInput"
            min="1"
            max="20"
            value={length}
            className="w-full mt-2"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            checked={isChar}
            onChange={(e) => setIsChar(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label className="ml-2">Include letters (a-z, A-Z)</label>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label className="ml-2">Include special characters (!@#$%^&*)</label>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            checked={isNumber}
            onChange={(e) => setIsNumber(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <label className="ml-2">Include numbers (0-9)</label>
        </div>
        <button
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          onClick={passWordGenerate}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator2;
