// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useLocation, useNavigate } from 'react-router-dom';
// import Modal from '../../components/modals/Modal';

import { useActionState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from '../../components/modals/Modal'
import Input from '../../components/common/Input';

type stateType = {
  email: string,
  password: string,
  success: boolean,
  errors?: string | null
}

const initial_state = {
  email: "",
  password: "",
  success: false,
  errors: null
}

const mockUsers = [{
    email: "hehe@pw.edu.pl",
    password: "qwerty1234"
}]

async function handleAction(_: stateType, formData: FormData): Promise<stateType>{
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    //submit data

    return await new Promise(resolve => setTimeout(()=>{
        const isSuccess = mockUsers.some(user => user.email === data.email && user.password === data.password);

        resolve({
            email: data.email,
            password: '',
            success: isSuccess,
            errors: isSuccess ? null : "invalid credentials"
        });
    }, 1000))
}


//TO-DO: Handle login and Registeration code duplication after discussion
export default function LoginPage() {
  const location = useLocation();
  const isRegisterOpen = location.pathname == "/login";
  const navigate = useNavigate();

  const [state,formAction] = useActionState(handleAction, initial_state);

  useEffect(()=>{
    if(state.success && state.errors==null)
        navigate("/main");
  }, [state, navigate])
  
  function emailValidator(e: React.ChangeEvent<HTMLInputElement>){
        const input = e.currentTarget;
        const valid = /^[^@]+@pw\.edu\.pl$/.test(input.value);

        input.setCustomValidity(valid ? "" : "Use @pw.edu.pl email");
        input.reportValidity();
  }

  //TO-DO: DISABLE CREATE BUTTON WHILE IS PENDING
  return (
    <Modal open={isRegisterOpen} className="register-page" onClose={()=>navigate("/")}>    
        <p>Welcome back to Student Planner</p>

        <form action={formAction}>
            <Input type="email" id="email" label="University Email" defaultValue={state.email}
                pattern="^[^@]+@pw\.edu\.pl$" onChange={emailValidator}/>

            <Input type="password" id="password" label="Password" defaultValue={state.password}
                error={state.errors}/>
          
          <button type="submit">Log In</button> 
        </form>
    </Modal>
  )
}


// function LoginPage() {
//   const location = useLocation();
//   const isLoginOpen = location.pathname == "/login";
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     let isValid = true

//     if (email.trim() === '') {
//       setEmailError('Email is required.')
//       isValid = false
//     } else {
//       setEmailError('')
//     }

//     if (password.trim() === '') {
//       setPasswordError('Password is required.')
//       isValid = false
//     } else {
//       setPasswordError('')
//     }

//     if (isValid) {
//       alert('Login form is valid (UI only for now).')
//     }
//   }

//   return (
//     <Modal open={isLoginOpen} onClose={()=>navigate("/")} className='login-page'>
//       <section className="login-card">
//         <h1>Login</h1>
//         <p>Welcome back to Student Planner</p>

//         <form onSubmit={handleSubmit} noValidate>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//           {emailError && <small className="error-text">{emailError}</small>}

//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//           {passwordError && <small className="error-text">{passwordError}</small>}

//           <button type="submit">Login</button>
//         </form>

//         <div className="auth-link-row">
//           <Link to="/register" className="text-link">
//             Don’t have an account? Register
//           </Link>
//         </div>
//       </section>
//     </Modal>
//   )
// }

// export default LoginPage