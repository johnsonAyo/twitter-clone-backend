import app from './app';

const Socketapi = () => {
  let users: any[] = [];

  const addUser = (userId: any, socketId: string) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId: any) => {
    return users.find((user) => user.userId === userId);
  };

  app.io.on('connection', (socket) => {
    //when ceonnect
    console.log('connection');
    //take userId and socketId from user
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      app.io.emit('getUsers', users);
      console.log({ users });
      console.log('a user connected.');
      console.log(userId, socket.id);
    });

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId._id);
      console.log({ user });
      console.log({ senderId, receiverId, text });
      app.io.to(user.socketId!).emit('getMessage', {
        senderId,
        text,
      });
      console.log(senderId, text);
    });

    //when disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
      removeUser(socket.id);
      app.io.emit('getUsers', users);
    });
  });

  // // socket auth middleware
  // app.io.use(async (socket, next) => {
  //   const token = socket.handshake.auth.token;

  //   try {
  //     const decodedToken: any = jwt.verify(
  //       token as string,
  //       process.env.JWT_SECRET as string
  //     );

  //     if (decodedToken) {
  //       const user = await User.findById(decodedToken.id);

  //       if (!user) {
  //         return next(new Error("user no longer exist"));
  //       }

  //       // add to online logged in users
  //       addToLoggedIn(socket.id, user._id);

  //       // get users following the newly logged in user from DB
  //       // const userFollowers = await Follower.findOne({ userId: user._id });

  //       // get users following the newly logged in user from online logged in user
  //       // const friends = getFriends(userFollowers.followers);

  //       // notify the followers of the logged in user that a friend just logged in
  //       // friends.forEach((friend) => {
  //       //   app.io.to(friend.socketId).emit("new-login", user);
  //       // });

  //       next();
  //     } else {
  //       return next(new Error("invalid login credentials"));
  //     }
  //   } catch (e) {
  //     return next(new Error("invalid login credentials"));
};

export default Socketapi;
