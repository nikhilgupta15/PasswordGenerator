import "./App.css";
import React, { useState } from "react";
const uppercase = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const lowercase = Array.from("abcdefghijklmnopqrstuvwxyz");
const numbers = Array.from("0123456789");
const symbols = Array.from("!@#$%^&*");

function App() {
  const [lengthOfPassword, setLengthOfPassword] = useState(4);
  const [checkboxesSelected, setCheckboxesSelected] = useState({
    uppercase: false,
    lowercase: false,
    symbols: false,
    numbers: false,
  });
  const [password, setPassword] = useState("");
  const [pwdStrength, setPwdStrength] = useState("");
  const [error, setError] = useState(false);
  const [showStrength, setStrength] = useState(false);

  const handleSliderChange = (e) => {
    //console.log(e.target.value);
    setLengthOfPassword(e.target.value);
  };

  const handleCheckbox = (e) => {
    setCheckboxesSelected((prevState) => {
      return { ...prevState, [e.target.id]: e.target.checked };
    });
  };

  const generatePassword = () => {
    const options = ["uppercase", "lowercase", "symbols", "numbers"];
    let pwd = "";

    if (
      !checkboxesSelected.uppercase &&
      !checkboxesSelected.lowercase &&
      !checkboxesSelected.numbers &&
      !checkboxesSelected.symbols
    ) {
      setStrength(false);
      setError(true);
      return;
    } else {
      if (!showStrength) setStrength(true);
      if (error) setError(false);
    }

    while (pwd.length < lengthOfPassword) {
      let option = options[Math.floor(Math.random() * 4)];
      //console.log(pwd.length, lengthOfPassword);

      if (option === "uppercase" && checkboxesSelected[option]) {
        pwd = pwd + uppercase[Math.floor(Math.random() * uppercase.length)];
      }
      if (option === "lowercase" && checkboxesSelected[option]) {
        pwd = pwd + lowercase[Math.floor(Math.random() * lowercase.length)];
      }
      if (option === "numbers" && checkboxesSelected[option]) {
        pwd = pwd + numbers[Math.floor(Math.random() * numbers.length)];
      }
      if (option === "symbols" && checkboxesSelected[option]) {
        pwd = pwd + symbols[Math.floor(Math.random() * symbols.length)];
      }
      //console.log(pwd);
    }
    if (pwd.length < 4) {
      setPwdStrength("Weak");
    } else if (pwd.length < 8) {
      setPwdStrength("Poor");
    } else if (pwd.length < 12) {
      setPwdStrength("Medium");
    } else if (pwd.length < 16) {
      setPwdStrength("Strong");
    } else {
      setPwdStrength("Very Strong");
    }

    setPassword(pwd);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
  };

  return (
    <div className="App">
      <div className="outer-container">
        {!error ? (
          showStrength ? (
            <div className="ShowPasswordAndCopy">
              <p>{password}</p>
              <button className="CopyButton" onClick={handleCopyToClipboard}>
                COPY
              </button>
            </div>
          ) : null
        ) : (
          <div className="ErrorMessage">
            <h4>Select atleast one checkbox to generate a password</h4>
          </div>
        )}
        <div className="ShowCharacterLength">
          <h4>Character Length</h4>
          <h4>{lengthOfPassword}</h4>
        </div>
        <div className="LengthSlider">
          <input
            type="range"
            min="1"
            max="30"
            value={lengthOfPassword}
            className="slider"
            id="rangeSlider"
            onChange={handleSliderChange}
          />
        </div>
        <div className="PasswordCheckboxes" onChange={handleCheckbox}>
          <div className="checkboxes">
            <input type="checkbox" id="uppercase" />
            <label for="uppercase">Include UpperCase Letters</label>
          </div>
          <div className="checkboxes">
            <input type="checkbox" id="lowercase" />
            <label for="lowercase">Include LowerCase Letters</label>
          </div>
          <div className="checkboxes">
            <input type="checkbox" id="symbols" />
            <label for="symbols">Include Symbols</label>
          </div>
          <div className="checkboxes">
            <input type="checkbox" id="numbers" />
            <label for="numbers">Include Numbers</label>
          </div>
        </div>
        {showStrength ? (
          <div className="PasswordStrength">
            <h4>Strength: </h4>
            <h4>{pwdStrength}</h4>
          </div>
        ) : null}
        <div className="GeneratePassword">
          <button className="GeneratePasswordButton" onClick={generatePassword}>
            GENERATE PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
