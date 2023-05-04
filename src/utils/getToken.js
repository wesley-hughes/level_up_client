export const getToken = () => {
    const auth = localStorage.getItem("lu_token")
    return auth
  }
  