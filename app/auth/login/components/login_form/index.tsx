'use client'

import { BrCheckbox, BrInput, BrMessage } from '@govbr-ds/webcomponents-react'
import { useState } from 'react'

import Link from 'next/link'
import BrButtonCustomize from '@/components/br_button_customize'

type LoginData = {
  cpfOrEmail: string
  password: string
}

const initialLoginData: LoginData = {
  cpfOrEmail: '',
  password: '',
}

const initialLoginErrors: LoginData = {
  cpfOrEmail: '',
  password: '',
}

interface Props {
  onLogin: (emailOrCpf: string, password: string) => void
}

export function LoginForm({ onLogin }: Props) {
  const [values, setValues] = useState<LoginData>(initialLoginData)
  const [errors, setErrors] = useState<LoginData>(initialLoginErrors)

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, '')
    if (cpf.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(10))) return false

    return true
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'A senha deve ter pelo menos 8 caracteres'
    return ''
  }

  const handleChange = (field: keyof LoginData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const newErrors = { ...initialLoginErrors }
    let isValid = true

    if (!values.cpfOrEmail) {
      newErrors.cpfOrEmail = 'Email ou CPF é obrigatório'
      isValid = false
    } else {
      const cleanValue = values.cpfOrEmail.replace(/[^\d]/g, '')
      const isNumericOnly = cleanValue === values.cpfOrEmail.replace(/[.\-]/g, '')

      if (isNumericOnly && cleanValue.length >= 10) {
        if (!validateCPF(values.cpfOrEmail)) {
          newErrors.cpfOrEmail = 'CPF inválido'
          isValid = false
        }
      } else if (values.cpfOrEmail.includes('@')) {
        if (!validateEmail(values.cpfOrEmail)) {
          newErrors.cpfOrEmail = 'Email inválido'
          isValid = false
        }
      } else {
        newErrors.cpfOrEmail = 'Digite um email válido ou CPF válido'
        isValid = false
      }
    }

    if (!values.password) {
      newErrors.password = 'Senha é obrigatória'
      isValid = false
    } else {
      const passwordError = validatePassword(values.password)
      if (passwordError) {
        newErrors.password = passwordError
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) onLogin(values.cpfOrEmail, values.password)
  }

  const renderErrors = (error: string) =>
    error && (
      <BrMessage state="danger" show-icon="true" className="min-w-72 w-full">
        {error}
      </BrMessage>
    )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md space-y-4 min-w-[300px] items-center justify-center shadow-xl px-10 py-10">
      <h2 className="self-start text-[1.5rem]">Identifique-se com:</h2>

      <BrInput
        className="min-w-72 w-full"
        type="text"
        id="cpfOrEmail"
        placeholder="Entre com seu email ou CPF"
        label="Email / CPF"
        value={values.cpfOrEmail}
        onInput={(e: any) => handleChange('cpfOrEmail', e.target.value)}
        state={errors.cpfOrEmail ? 'danger' : undefined}
      />
      {renderErrors(errors.cpfOrEmail)}

      <BrInput
        className="min-w-72 w-full"
        type="password"
        id="password"
        placeholder="Entre com sua senha de acesso"
        label="Senha"
        value={values.password}
        onInput={(e: any) => handleChange('password', e.target.value)}
        state={errors.password ? 'danger' : undefined}
      />
      {renderErrors(errors.password)}

      <BrButtonCustomize emphasis='primary' className="w-full" type="submit">
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

      <Link href="/auth/forgot-password" className="self-start text-secondary_blue hover:text-blue-600 transition-colors duration-200">
        Esqueceu sua senha?
      </Link>

      <BrButtonCustomize emphasis='secondary' className="w-full" type="submit">
        Registre-se agora!
      </BrButtonCustomize>

      <p className="text-center">Se você é profissional da saúde de uma UBS no estado do Maranhão, faça o seu registro e comece a usar a nossa plataforma de teleconsultoria.</p>
    </form>
  )
}