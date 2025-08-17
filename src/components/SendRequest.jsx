import { useState } from "react";
import { Input } from "./Input.jsx";
import Button from "./Button.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";

import { useAuth } from "../contexts/AuthContext.jsx";
import { useAlert } from "../contexts/AlertContext.jsx";
const SendRequest = () => {
  const { currentColor } = useStateContext();
  const [val, setval] = useState("");
  const [name, setname] = useState("");
  const { sendRequest } = useAuth();
  const { showAlert } = useAlert();

  const HandleOnChange = (event) => {
    setval(event.target.value);
  };

  const HandleOnChangepass = (event) => {
    setname(event.target.value);
  };
  const Handleonsubmit = () => {
    sendRequest(val, name);
    // console.log(response.data);
    // if (response.status === 200) {
    //   showAlert(response.data, "info");
    // }

    setval(""), setname("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="GroupId"
        placeholder="Enter GroupId"
        HandleOnChange={HandleOnChange}
        val={val}
      />
      <Input
        type="text"
        label="Name"
        placeholder="Enter Name"
        HandleOnChange={HandleOnChangepass}
        val={name}
      />
      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Send Request"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};
export default SendRequest;
