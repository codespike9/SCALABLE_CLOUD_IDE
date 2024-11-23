const docker = require("../dockerClient");
const { findContainer, addContainerDetails } = require("../model/programmingModel");

const port_to_container = {};

const findProgrammingService = async(req, res)=>{
    try {
        
        const container = await findContainer(req.user.email);

        if(!container){
            const containerDetails = await spinContainer(req.user.id, req.user.email);
            await addContainerDetails(containerDetails.Id, req.user.id, req.user.email);
            return res.status(200).json({
                message: "Container created and data fetched successfully.",
                container_details:containerDetails
            })
        }else{
            const containerDetails = await findContainerById(container.container_id);
            return res.status(200).json({
                message: "Container data fetched successfully.",
                container_details:{ Port: containerDetails.details.HostConfig.PortBindings["9000/tcp"][0].HostPort }
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        })
    }
}

const findContainerById = async (containerId) => {
    try {
        const container = docker.getContainer(containerId);
        const containerInfo = await container.inspect();
        return {
            found: true,
            details: containerInfo,
        };
    } catch (error) {
        if (error.statusCode === 404) {
            return {
                found: false,
                message: "Container not found.",
            };
        }
        console.error("Error finding container:", error.message);
        throw error;
    }
};

const spinContainer = async (containerName, email) => {
    try {
        
        const availablePort = (() => {
            for (let i = 7001; i < 7999; i++) {
              if (port_to_container[i]) continue;
              return `${i}`;
            }
          })();

        const containerOptions = {
            Image: "dharmarajjena/cloud_ide",
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

        return {
            Id: container.id,
            Name: containerName,
            Port: availablePort,
        };
    } catch (error) {
        console.error("Error spinning up container:", error.message);
        throw error;
    }
}

module.exports = { findProgrammingService }