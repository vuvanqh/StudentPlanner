import { useActionState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from '../../components/modals/Modal'
import Input from '../../components/common/Input';

type stateType = {
  token: string,
  password: string,
  confirmPassword: string,
  errors?: stateErrors | null
}

type stateErrors = {
  tokenError?: string,
  passwordError?: string,
  confirmPasswordError?: string,
}

const initial_state = {
  token: "",
  password: "",
  confirmPassword: "",
  errors: null
}

function handleAction(prev: stateType, formData: FormData): Promise<stateType>{
  return new Promise((resolve, reject)=>prev)
}

export default function ValidateTokenPage() {
  const location = useLocation();
  const isRegisterOpen = location.pathname == "/register";
  const navigate = useNavigate();


  const [state,formAction] = useActionState(handleAction, initial_state);
  return (
    <Modal open={isRegisterOpen} className="register-page" onClose={()=>navigate("/")}>    
        <p>We've sent a verification token to your email.</p>

        <form action={formAction} noValidate>
          <Input type="text" id="token" label="Token" value={state.token}
            error={state.errors?.tokenError}/>

          <div className='form-row'>
            <Input type="password" id="password" label="Password" value={state.password}
              error={state.errors?.passwordError}/>

            <Input type="password" id="confirmPassword" label="Confirm Password" value={state.confirmPassword}
              error={state.errors?.confirmPasswordError}/>
          </div>
          
          <button type="submit">Create Account</button>
        </form>
    </Modal>
  )
}


//  <Modal open={isRegisterOpen} className="register-page" onClose={()=>navigate("/")}>
//       <section className="register-card">
//         <h1>Create Account</h1>
//         <p>Join Student Planner today</p>

//         <form onSubmit={handleSubmit} noValidate>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             type="text"
//             placeholder="Enter your first name"
//             value={firstName}
//             onChange={(event) => setFirstName(event.target.value)}
//           />
//           {firstNameError && <small className="error-text">{firstNameError}</small>}

//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             type="text"
//             placeholder="Enter your last name"
//             value={lastName}
//             onChange={(event) => setLastName(event.target.value)}
//           />
//           {lastNameError && <small className="error-text">{lastNameError}</small>}

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

//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             id="confirmPassword"
//             type="password"
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChange={(event) => setConfirmPassword(event.target.value)}
//           />
//           {confirmPasswordError && <small className="error-text">{confirmPasswordError}</small>}

//           <button type="submit">Create Account</button>
//         </form>

//         <div className="auth-link-row">
//           <Link to="/login" className="text-link">
//             Already have an account? Login
//           </Link>
//         </div>
//       </section>
//     </Modal>