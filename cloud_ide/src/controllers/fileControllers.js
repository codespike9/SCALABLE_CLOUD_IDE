const path = require("path");
const fs = require("fs/promises");
const { generateKey } = require("crypto");

currentDir = path.join(__dirname, "..", "..", "public");

const getFileContent = async (req, res) => {
  try {
    let filePath = req.query.filePath;
    filePath = path.join(currentDir, filePath);
    console.log(filePath);
    const content = await fs.readFile(filePath, "utf-8");
    console.log(content);
    return res.json({ content: content });
  } catch (error) {
    console.error(error);
  }
};

const getFiles = async (req, res) => {
  try {
    const {folderName}=req.body;
    reqDir = path.join(__dirname, "..", "..", "public",folderName);
    const fileTree = await generateFileTree(reqDir);
    return res.json({ tree: fileTree });
  } catch (error) {
    console.error("Error getting file tree: ", error);
  }
};

async function generateFileTree(directory) {
  const tree = {};

  async function buildTree(currDir, currentTree) {
    try {
      const files = await fs.readdir(currDir);

      await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(currDir, file);
          const stat = await fs.stat(filePath);

          if (stat.isDirectory()) {
            currentTree[file] = {};
            await buildTree(filePath, currentTree[file]);
          } else {
            currentTree[file] = null;
          }
        })
      );

    } catch (error) {
      console.error(error);
    }
  }

  await buildTree(directory, tree);
  return tree;
}

module.exports = { getFiles, getFileContent };
