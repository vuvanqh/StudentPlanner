import { useActionState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Modal from '../../components/modals/Modal'
import Input from '../../components/common/Input';
import { useAuth } from '../../hooks/authHooks';

type stateType = {
  email: string,
  password: string,
  success: boolean,
  errors?: string | null
}

const initial_state: stateType = {
  email: "",
  password: "",
  success: false,
  errors: null
}


export default function RegisterPage() {
  const location = useLocation();
  const isRegisterOpen = location.pathname == "/register";
  const navigate = useNavigate();
  const {registerUser} = useAuth();

  async function handleAction(_: stateType, formData: FormData){
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
    }

    if (data.email.trim().length === 0|| data.password.length===0) {
      return {
        email: '',
        password: '',
        errors: ['Invalid form data']
      }
    }

    //submit data
    try {
      await registerUser(data);
      return {
        email: data.email,
        password: '',
        errors: null
      }
    }
    catch(err: any)
    {
      const raw = err.info?.errors;
      let errors = [];
      if (Array.isArray(raw)) 
          errors.push(...raw);
      
      if (typeof raw === "string") 
          errors.push(raw);
      
      return {
        email: data.email,
        password: '',
        errors: ["invalid credentials", ...errors]
      }
    }
  }

  const [state,formAction] = useActionState(handleAction, initial_state);

  
  function emailValidator(e: React.ChangeEvent<HTMLInputElement>){
        const input = e.currentTarget;
        const valid = /^[^@]+@pw\.edu\.pl$/.test(input.value);

        input.setCustomValidity(valid ? "" : "Use @pw.edu.pl email");
        input.reportValidity();
  }
  //TO-DO: DISABLE CREATE BUTTON WHILE IS PENDING
  return (
    <Modal open={isRegisterOpen} className="register-page" onClose={()=>navigate("/")}>    
        <p>Join Student Planner today</p>

        <form key={state.email + state.password} action={formAction}>
            <Input type="email" id="email" label="University Email" defaultValue={state.email}
                pattern="^[^@]+@pw\.edu\.pl$" onChange={emailValidator}/>

            <Input type="password" id="password" label="Password" defaultValue={state.password}
                error={state.errors}/>
          
          <button type="submit">Create Account</button> 
        </form>
    </Modal>
  )
}
