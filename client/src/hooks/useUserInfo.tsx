export const useUserInfo = () => {
  const nickname = localStorage.getItem('nickName');

  return {
    nickname
  }
}