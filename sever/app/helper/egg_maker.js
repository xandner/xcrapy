const fs=require('fs')
const path=require('path')
const { exec } = require("child_process");

const egg_maker = async (spider_name, spider_address) => {
  console.log(spider_address);
  fs.writeFileSync(
    path.join(spider_address, "egg_maker.py"),
    `from setuptools import setup,find_packages

setup(
    name="${spider_name}",
    version="0.1",
    packages=find_packages()
)`
  );  
  if (process.platform=="win32"||process.platform=="win64"){
    console.log("making egg")
    try {
        //cd Desktop\super_scrapy && python egg_maker.py bdist_egg
        exec(
          `cd ${spider_address} && python egg_maker.py bdist_egg`,
          (err, stdout, stderr) => {
            if (err) {
              console.log(err);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          }
        );
    } catch (error) {
        console.log(error)
    }
  }
};

module.exports = {
  egg_maker,
};
