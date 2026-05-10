let socketServer = null;

const setSocketServer = (io) => {
  socketServer = io;
};

const getSocketServer = () => socketServer;

export { setSocketServer, getSocketServer };
