import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [spanCount, setSpanCount] = useState<number>(100);

  useEffect(() => {
    function handleResize() {
      const spanSize =
        Math.max(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        ) > 600
          ? 50
          : 20;
      const newSpanCount =
        Math.floor(window.innerWidth / spanSize) *
        Math.floor(window.innerHeight / spanSize);
      setSpanCount(newSpanCount);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (data.username === "user" && data.password === "password") {
      navigate("/Top");
    } else {
      setErrorMsg("Incorrect username or password.");
    }
  };

  return (
    <section>
      {Array.from({ length: spanCount }).map((_, index) => (
        <span key={index}></span>
      ))}

      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="inputBox">
              <input
                type="text"
                required
                {...register("username", { required: "Username is required" })}
              />
              <i>Username</i>
              <ErrorMessage errors={errors} name="username" as={<p />} />
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                {...register("password", { required: "Password is required" })}
              />
              <i>Password</i>
              <ErrorMessage errors={errors} name="password" as={<p />} />
            </div>
            <div className="links">
              <a href="#">Forgot Password</a>
              <a href="#">Signup</a>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
            {errorMsg && <div className="error">{errorMsg}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
