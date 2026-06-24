import {type FormEvent, useState} from 'react';

import {useNavigate} from 'react-router';

import AuthLayout from '@/app/layout/AuthLayout';
import {Button, Input} from '@/shared/components';
import {ROUTES} from '@/shared/constants/routes';

export function LoginPage() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 API 연동
    navigate(ROUTES.HOME);
  };

  return (
    <AuthLayout>
      <form className='flex w-full flex-col gap-5' onSubmit={handleSubmit}>
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
          minLength={6}
          maxLength={72}
          autoComplete='current-password'
          fullWidth
        />
        <Button type='submit' fullWidth>
          로그인
        </Button>
      </form>
    </AuthLayout>
  );
}
