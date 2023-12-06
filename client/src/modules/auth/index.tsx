import { Input, Text, Center, Button } from '@chakra-ui/react'
import { useInputValue } from '../../hooks/useInputValue';
import { useNavigate, Navigate } from 'react-router-dom'

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem('nickName');

  if (!user) {
    return <Navigate to='/auth' />
  }

  return children
}

const AuthPage = () => {
  const [nickname, onChange] = useInputValue<HTMLInputElement>('');
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (nickname) {
      localStorage.setItem('nickName', nickname);
      navigate('/')
    }
  }

  return (
    <Center flexDirection='column' gap='50px' as='section'>
      <Text as='h1'>Login Page</Text>
      <Center flexDirection='column'>
        <Text color='Highlight' as='label'>Enter your nickname</Text>
        <Input mb='15px' maxWidth='350px' value={nickname} onChange={onChange} type='text' aria-label='User Name' />
        <Button onClick={handleOnClick} _disabled={{ background: 'red' }} border='none' isDisabled={!nickname}>Enter</Button>
      </Center>
    </Center>
  )
}

export default AuthPage