import {type FormEvent, useState} from 'react';

import AuthLayout from '@/app/layout/AuthLayout';
import {Button, Input} from '@/shared/components';
import {useLogin} from '@/pages/login/hooks/useLogin';

const LoginPage = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const {mutate: login, isPending} = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({studentNumber, password});
  };

  return (
    <AuthLayout>
      <form className='flex w-full flex-col gap-5' onSubmit={handleSubmit}>
        <Input
          id='student-number'
          label='아이디(사번)'
          placeholder='사번을 입력하세요'
          inputMode='numeric'
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value.replace(/\D/g, ''))}
          autoComplete='username'
          fullWidth
        />
        <Input
          id='password'
          label='비밀번호'
          placeholder='비밀번호를 입력하세요'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          maxLength={72}
          autoComplete='current-password'
          fullWidth
        />
        <Button type='submit' isLoading={isPending} fullWidth>
          로그인
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
