const getRecipientEmail = (users: any, userLoggedIn: any) =>
  users?.filter((user: any) => user !== userLoggedIn?.email)[0]

export default getRecipientEmail
