import { Box, Center } from '@chakra-ui/react'
import { FC, memo } from 'react'
import { useUserInfo } from '../../hooks/useUserInfo'
import { htmlDecode } from '../../utility'

type MessageProps = {
  text?: string,
  author: string,
  date: Date
}

export const Message: FC<MessageProps> = memo(({ text, author, date }) => {
  const messageDate = new Date(date)
  const { nickname } = useUserInfo();
  const isOwner = author === nickname;
  const messageTime = `${messageDate.getHours()}:${messageDate.getMinutes()}`

  return (
    <Center justifyContent={isOwner ? 'flex-end' : 'flex-start'} w='100%'>
      <Box w='47%' pos='relative'>
        <Box minW='50px' maxW='inherit' p='2px 5px' zIndex='10' pos='relative'>
          {!isOwner && <Box fontWeight='700' textAlign='start'>{author}</Box>}
          {text && <Box>{htmlDecode(text)}</Box>}
          <Box textAlign={isOwner ? 'end' : 'start'}>{messageTime}</Box>
        </Box>
        <Box pos='absolute' w='100%' h='100%' top='0' left='0' opacity='0.7' backgroundColor={isOwner ? 'grey' : 'blue'} />
      </Box>
    </Center >
  )
})