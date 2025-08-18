import { useReducer } from "react";
import { Input } from "./Input.jsx";
import Button from "./Button.jsx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useAlert } from "../contexts/AlertContext.jsx";
import { useNavigate } from "react-router-dom";

const initial = {
  val: "",
  pass: "",
  phone: "",
};

const reducer = (current, action) => {
  switch (action.type) {
    case "update":
      return {
        ...current,
        [action.field]: action.value,
      };
    case "submit":
      return initial;
    default:
      return current;
  }
};

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showAlert } = useAlert();
  const { currentColor } = useStateContext();
  const [state, dispatch] = useReducer(reducer, initial);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const HandleOnChange = (field) => (event) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    {
      dispatch({ type: "update", field, value: event.target.value });
    }
  };

  const HandleOnsubmit = async () => {
    const { val, pass, phone } = state;
    if (val && pass && phone) {
      if (phone.length !== 10) {
        showAlert("Phone number must be exactly 10 digits.", "danger");
        return;
      }

      if (isSubmitting) {
        showAlert("Please wait before trying again.", "warning");
        return;
      }

      setIsSubmitting(true);

      const result = await signup(val, pass, phone);
      if (result.status === 200) {
        showAlert("User ID :." + result.data, "info");
        alert("User ID :." + result.data, "info");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        showAlert("Invalid credentials, please try again.", "danger");
      }
      dispatch({ type: "submit" });

      setTimeout(() => {
        setIsSubmitting(false);
      }, 4000);
    }
  };

  return (
    <div className="box">
      <Input
        type="text"
        label="Full Name"
        placeholder="Enter name"
        HandleOnChange={HandleOnChange("val")}
        val={state.val}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        HandleOnChange={HandleOnChange("pass")}
        val={state.pass}
      />
      <Input
        type="text"
        label="Phone No"
        placeholder="Enter Phone number"
        HandleOnChange={HandleOnChange("phone")}
        val={state.phone}
      />

      <Button
        color="btn btn-primary btp"
        bgColor={currentColor}
        width="40"
        borderRadius="10px"
        text="Sign up"
        H="k"
        HandleOnSubmit={HandleOnsubmit}
      />
    </div>
  );
};
export default Signup;
