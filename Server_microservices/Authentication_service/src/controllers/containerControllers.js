// const prisma = require("../prismaClient");
const docker = require("../dockerClient");

const port_to_container = {};
const container_to_port = {};

const spinContainer = async (containerName, email) => {
  try {

    const availablePort = (() => {
      for (let i = 7001; i < 7005; i++) {
        if (port_to_container[i]) continue;
        return `${i}`;
      }
    })();

    const containerOptions = {
      Image: "cloud-ide",
      name: containerName,
      AttachStdout: true,
      Tty: true,
      HostConfig: {
        PortBindings: {
          "9000/tcp": [{ HostPort: availablePort }],
        },
      },
    };

    const container = await docker.createContainer(containerOptions);
    await container.start();

    port_to_container[availablePort] = container.id;
    container_to_port[container.id] = availablePort;

    await prisma.user.update({
      where: { email: email },
      data: { port: Number(availablePort) },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const spinPlayGround = async (req, res) => {
  try {
    // const containers=await docker.listContainers();
    // const containerInfo=containers.find((container)=>container.Names.some(name=>name===`/container${req.user.id}`));
    // console.log(container_to_port)
    // console.log(containerInfo.Id);
    const container = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { port: true },
    });
    const assignedContainer = docker.getContainer(port_to_container[container.port]);
    const containerDetails = await assignedContainer.inspect();

    if(containerDetails.State.Paused){
      await assignedContainer.unpause();
    }

    res
      .status(200)
      .json({
        message: `Your playground is running on port ${container.port}`,
        port: container.port,
      });
  } catch (error) {
    console.error(error);
  }
};

const pausePlayGround = async (req, res) => {
  try {
    const containers = await docker.listContainers();
    const containerInfo = containers.find((container) =>
      container.Names.some((name) => name === `/container${req.user.id}`)
    );
    const container = docker.getContainer(containerInfo.Id);
    await container.pause();
    return res.status(201).json({message:"Paused playground."});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal server error."});
  }
};

module.exports = { spinContainer, spinPlayGround, pausePlayGround };
