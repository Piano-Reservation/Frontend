import {type FormEvent, useState} from 'react';

import {useNavigate} from 'react-router';

import AuthLayout from '@/app/layout/AuthLayout';
import {Button, Input} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 학생 인증 API 연동
    navigate(ROUTES.LOGIN);
  };

  return (
    <AuthLayout>
      <form className='flex w-full flex-col gap-5' onSubmit={handleSubmit}>
        <Input
          id='name'
          label='이름'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='name'
          fullWidth
        />
        <Input
          id='employee-id'
          label='아이디(사번)'
          placeholder='사번을 입력하세요'
          inputMode='numeric'
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value.replace(/\D/g, ''))}
          autoComplete='username'
          fullWidth
        />
        <Input
          id='password'
          label='비밀번호(생년월일 6자리)'
          placeholder='비밀번호를 입력하세요'
          type='password'
          inputMode='numeric'
          value={password}
          onChange={(e) => setPassword(e.target.value.replace(/\D/g, ''))}
          autoComplete='new-password'
          fullWidth
        />
        <Input
          id='email'
          label='이메일'
          placeholder='이메일을 입력하세요'
          type='email'
          inputMode='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          fullWidth
        />
        <Button type='submit' fullWidth>
          학생 인증 요청하기
        </Button>
      </form>
    </AuthLayout>
  );
}
