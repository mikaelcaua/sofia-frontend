'use client'

import { BrButton, BrCheckbox, BrInput, BrMessage } from '@govbr-ds/webcomponents-react'
import { useState } from 'react'
import BrButtonCustomize from '../br_button_customize'

type LoginData = {
  nameOrEmail: string
  password: string
}

const initialLoginData: LoginData = {
  nameOrEmail: '',
  password: '',
}

const initialLoginErrors: LoginData = {
  nameOrEmail: '',
  password: '',
}

interface Props {
  onLogin?: (values: LoginData) => void
}

export default function LoginForm({ onLogin }: Props) {
  const [values, setValues] = useState<LoginData>(initialLoginData)
  const [errors, setErrors] = useState<LoginData>(initialLoginErrors)
  const [message, setMessage] = useState({ message: '', state: '', show: false })

  const handleChange = (field: keyof LoginData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const validateField = (field: keyof LoginData, value: string) => {
    let error = ''
    if (!value) {
      error = field === 'nameOrEmail' ? 'Email ou CPF é obrigatório' : 'Senha é obrigatória'
    }
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const validateForm = () => {
    const newErrors = { ...initialLoginErrors }
    let isValid = true

    if (!values.nameOrEmail) {
      newErrors.nameOrEmail = 'Email ou CPF é obrigatório'
      isValid = false
    }
    if (!values.password) {
      newErrors.password = 'Senha é obrigatória'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleBlur = (field: keyof LoginData) => {
    validateField(field, values[field])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setMessage({ message: 'Login realizado com sucesso!', state: 'success', show: true })
      if (onLogin) onLogin(values)
      console.log('Login:', values)
    } else {
      setMessage({ message: 'Por favor, corrija os erros.', state: 'danger', show: true })
    }
  }

  const renderErrors = (error: string) =>
    error && (
      <BrMessage state="danger" show-icon="true" className="min-w-72 w-full">
        {error}
      </BrMessage>
    )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto mt-10 space-y-4 min-w-[300px] items-center justify-center">
      <h2 className="self-start">Identifique-se com:</h2>

      <BrInput
        className="min-w-72 w-full"
        type="text"
        id="nameOrEmail"
        placeholder="Entre com seu email ou CPF"
        label="Email / CPF"
        value={values.nameOrEmail}
        onInput={(e: any) => handleChange('nameOrEmail', e.target.value)}
        onBlur={() => handleBlur('nameOrEmail')}
        state={errors.nameOrEmail ? 'danger' : undefined}
      />
      {renderErrors(errors.nameOrEmail)}

      <BrInput
        className="min-w-72 w-full"
        type="password"
        id="password"
        placeholder="Entre com sua senha de acesso"
        label="Senha"
        value={values.password}
        onInput={(e: any) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        state={errors.password ? 'danger' : undefined}
      />
      {renderErrors(errors.password)}

      <BrButtonCustomize emphasis='primary' className="w-full">
        Entrar
      </BrButtonCustomize>

      <BrButtonCustomize emphasis='primary' className="w-full">
        Entrar com gov.br
      </BrButtonCustomize>

      <BrCheckbox
        className="self-end"
        label="Mantenha-me conectado"
        name="manter conectado"
        aria-label="Mantenha-me conectado" />


      <BrButton type="button" emphasis="tertiary" className="self-start">
        Esqueceu sua senha?
      </BrButton>


      <BrButtonCustomize emphasis='secondary' className="w-full">
        Registre-se agora!
      </BrButtonCustomize>

      <p className="text-center">Se você é profissional da saúde de uma UBS no estado do Maranhão, faça o seu registro e comece a usar a nossa plataforma de teleconsultoria.</p>
    </form>
  )
}
