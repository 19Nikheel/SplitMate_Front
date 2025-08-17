import { useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/AlertContext.jsx";

const EnterChannel = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { currentColor } = useStateContext();
  const [name, setname] = useState("");
  const [groupId, setGroupId] = useState("");
  const { Enter_Channel } = useAuth();

  const HandleOnChange = (event) => {
    setGroupId(event.target.value);
  };

  const HandleOnChangepass = (event) => {
    setname(event.target.value);
  };
  const Handleonsubmit = async () => {
    const result = await Enter_Channel(groupId, name);
    if (result.success) {
      navigate("/");
    } else {
      showAlert("Invalid credentials, please try again.", "danger");
    }
    setname(""), setGroupId("");
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="GroupId"
        placeholder="Enter GroupId"
        HandleOnChange={HandleOnChange}
        val={groupId}
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
        text="Log in"
        H="k"
        HandleOnSubmit={Handleonsubmit}
      />
    </div>
  );
};
export default EnterChannel;
