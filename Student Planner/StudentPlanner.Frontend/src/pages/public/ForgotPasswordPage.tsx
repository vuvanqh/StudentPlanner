import { useActionState } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import Modal from '../../components/modals/Modal'
import Input from '../../components/common/Input';
import { useAuth } from '../../global-hooks/authHooks';

type stateType = {
  step: number,
  email: string,
  token: string,
  newPassword: string,
  confirmNewPassword: string,
  errors: string[],
  success: boolean
}

const initial_state: stateType = {
  step: 1,
  email: "",
  token: "",
  newPassword: "",
  confirmNewPassword: "",
  errors: [],
  success: false
}

export default function ForgotPasswordPage() {
  const location = useLocation();
  const isForgotOpen = location.pathname == "/forgot-password";
  const navigate = useNavigate();
  const { sendResetToken, resetPassword, isResetPending } = useAuth();

  const [state, formAction] = useActionState(handleAction, initial_state);

  async function handleAction(prevState: stateType, formData: FormData) {
    if (prevState.step === 1) {
      const data = { email: formData.get('email') as string }
      try {
        await sendResetToken(data);
      }
      catch (err) { }
      return { ...prevState, email: data.email, step: 2, errors: [] }
    }

    if (prevState.step === 2) {
      const data = {
        email: prevState.email,
        token: formData.get('token') as string,
        newPassword: formData.get('newPassword') as string,
        confirmNewPassword: formData.get('confirmNewPassword') as string
      }

      if (data.newPassword !== data.confirmNewPassword) {
        return { ...prevState, ...data, errors: ["Passwords don't match"] }
      }

      try {
        await resetPassword(data);
        navigate("/login");
        return { ...prevState, ...data, success: true, errors: [] }
      } catch (err: any) {
        const raw = err.response?.data || err.info?.errors;
        let errors = [];
        if (Array.isArray(raw))
          errors.push(...raw);

        else if (typeof raw === "string")
          errors.push(raw);
        else errors.push("Invalid or expired token");
        return { ...prevState, ...data, errors }
      }
    }
    return prevState;
  }

  return (
    <Modal open={isForgotOpen} className="register-page" onClose={() => navigate("/")}>
      <p>{state.step === 1 ? 'Reset Password' : 'Enter Reset Token'}</p>

      <form action={formAction} className='auth-form'>
        {state.step === 1 ? (
          <Input type="email" id="email" label="University Email" defaultValue={state.email} required />
        ) : (
          <>
            <small>If the email exists, a token was sent.</small>
            <Input type="text" id="token" label="Reset Token" defaultValue={state.token} required />
            <Input type="password" id="newPassword" label="New Password" defaultValue={state.newPassword} required />
            <Input type="password" id="confirmNewPassword" label="Confirm Password" defaultValue={state.confirmNewPassword} required />
          </>
        )}

        {state.errors?.map(error => <small className="error-text" key={error}>{error}</small>)}

        <button disabled={isResetPending}>
          {isResetPending ? 'Processing...' : (state.step === 1 ? 'Send Token' : 'Reset Password')}
        </button>

        <NavLink to="/login">Cancel</NavLink>
      </form>
    </Modal>
  )
}
