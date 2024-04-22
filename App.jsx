import { useCallback, useState,useRef } from 'react'


function App() {
  const [passwordLength, setPasswordLength] = useState(12)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const[specialCharAllowed,setSpecialCharAllowed] = useState(false)
  const[password,setpassword]  = useState("")
  const length = passwordLength
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let specialchar = "!@#$%^&*()-./:;<=>?@";
    if (numberAllowed)
    str += num;
    if (specialCharAllowed)
    str+=num+specialchar;
    
    for(let i = 1; i<= passwordLength; i++){
      
      pass += str.charAt(Math.floor(Math.random() * str.length +1 ));
      setpassword(pass);
    }

  },[passwordLength,numberAllowed,setNumberAllowed,setSpecialCharAllowed,setpassword]);
  const passwordRef = useRef(password);
  const copytoclipboard = (() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    alert("copied to clipboard");
  })
  return (
    
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Password Generator</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            readOnly
            value={password}
            
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
            onClick={copytoclipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="include-numbers" className="mr-2 text-gray-700">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="include-numbers"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
            className="mr-2 accent-blue-500"
          />
          <label htmlFor="include-symbols" className="mr-2 text-gray-700">
            Include Symbols
          </label>
          <input
            type="checkbox"
            id="include-symbols"
            checked={specialCharAllowed}
            onChange={(e) => setSpecialCharAllowed(e.target.checked)}
            className="mr-2 accent-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password-length" className="text-gray-700 mr-2">
            Password Length:
          </label>
          <input
            type="range"
            id="password-length"
            min="8"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
            className="w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-gray-700 ml-2">{passwordLength}</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App