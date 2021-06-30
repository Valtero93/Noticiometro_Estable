const findNameById = (selectedPersonId, users) => {
    const user = users.find((user) => user.id === +selectedPersonId);
  
    return user?.name;
  };
  
  export default findNameById;
  