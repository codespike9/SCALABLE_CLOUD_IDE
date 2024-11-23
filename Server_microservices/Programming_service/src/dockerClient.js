const Docker = require("dockerode");
const docker = new Docker();

/**
 * Logs into Docker Hub using the provided credentials.
 */
async function loginToDockerHub() {
    const dockerHubAccount = {
        username: process.env.DOCKER_USERNAME, // Fetch from environment variables
        password: process.env.DOCKER_PASSWORD,
        serveraddress: "https://index.docker.io/v1/",
    };

    try {
        const loginResponse = await docker.checkAuth(dockerHubAccount); // Use `checkAuth` for validation
        if (loginResponse.Status === "Login Succeeded") {
            console.log("Successfully logged into Docker Hub");
        } else {
            throw new Error("Unexpected response during Docker Hub login");
        }
    } catch (error) {
        console.error("Failed to log in to Docker Hub:", error.message);
        throw error; // Rethrow the error to stop further execution
    }
}

/**
 * Initialize the Docker instance and log in to Docker Hub.
 */
(async function initializeDocker() {
    try {
        await loginToDockerHub();
        console.log("Docker instance ready for use");
    } catch (err) {
        console.error("Error during Docker initialization:", err.message);
        process.exit(1); // Exit the process if initialization fails
    }
})();

module.exports = docker;
