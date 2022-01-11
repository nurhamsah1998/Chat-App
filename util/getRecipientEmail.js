const getRecipientEmail = (users, usersLoggedIn) => users?.filter((userToFilter) => userToFilter !== usersLoggedIn?.email)[0];
export default getRecipientEmail;
