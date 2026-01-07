import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


interface LoginValues {
  email: string;
  password: string;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const handleSubmit = async (
    values: LoginValues,
  ) => {
      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {status?.error && <p style={{ color: "red" }}>{status.error}</p>}
            {status?.success && (
              <p style={{ color: "green" }}>{status.success}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
