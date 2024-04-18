import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

type Inputs = {
  userid: number;
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
    if (data.userid === 1 && data.password === "password") {
      navigate("/List");
    } else {
      setErrorMsg("Incorrect userid or password.");
    }
  };

  return (
    <Section>
      {Array.from({ length: spanCount }).map((_, index) => (
        <Span key={index}></Span>
      ))}
      <Signin>
        <Content>
          <h2>Sign In</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <input
                type="text"
                required
                placeholder="userid"
                {...register("userid", { required: "userid is required" })}
              />
              <ErrorMessage errors={errors} name="userid" as={StyledError} />
            </InputBox>
            <InputBox>
              <input
                type="password"
                required
                placeholder="password"
                {...register("password", { required: "Password is required" })}
              />
              <ErrorMessage errors={errors} name="password" as={StyledError} />
            </InputBox>
            <InputBox>
              <input type="submit" value="Login" />
            </InputBox>
            {errorMsg && <Error>{errorMsg}</Error>}
          </Form>
        </Content>
      </Signin>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  overflow: hidden;
  background: #000;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#000, #0f0, #000);
    animation: ${keyframes`
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    `} 5s linear infinite;
  }
`;

const Span = styled.span`
  position: relative;
  display: block;
  width: calc(5vw - 2px);
  height: calc(5vw - 2px);
  background: #181818;
  z-index: 2;
  transition: 1.5s;
  &:hover {
    background: #0f0;
    transition: 0s;
  }
`;

const Signin = styled.div`
  position: absolute;
  width: 400px;
  background: #222;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  h2 {
    font-size: 2em;
    color: #0f0;
    text-transform: uppercase;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    background: #333;
    border: none;
    outline: none;
    padding: 25px 10px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    font-size: 1em;
    ::placeholder {
      color: #aaa;
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: #aaa;
    }
    ::-ms-input-placeholder {
      color: #aaa;
    }
  }
  input[type="submit"] {
    background: #0f0; /* Green background */
    color: #000; /* Black text color */
    font-weight: 600;
    font-size: 1.35em;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.2s;
  }
  input[type="submit"]:hover {
    background-color: #0c0; /* Slightly darker green */
  }
  input[type="submit"]:active {
    opacity: 0.6;
  }
  i {
    position: absolute;
    left: 0;
    padding: 15px 10px;
    font-style: normal;
    color: #aaa;
    transition: 0.5s;
    pointer-events: none;
  }
  input:focus ~ i,
  input:valid ~ i {
    transform: translateY(-7.5px);
    font-size: 0.8em;
    color: #fff;
  }
`;

const StyledError = styled.p`
  color: #ff686b;
  font-size: 0.8em;
  margin-top: 5px;
`;

const Error = styled.div`
  color: #ff686b;
  font-size: 0.8em;
  margin-top: 5px;
`;
