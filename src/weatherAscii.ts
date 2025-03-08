import chalk from "chalk";

const sun = `
    \\   |   /
     \`.   .'
  -- ( ${chalk.yellow("☀")} ) --  
     .'   '.
    /   |   \\
`;

const sunBehindClouds = `
       \\  |  /   
     ${chalk.yellow(" .-' ☀ '-. ")}  
    ${chalk.yellow("/   '---'   \\")}
   ${chalk.gray("(     .--.     )")}  
  ${chalk.gray("(_   (    )   _)")}  
     ${chalk.gray("'--'    '--'")}  
`;

const snow = `
      ${chalk.white("*")}     ${chalk.white("*")}    
   ${chalk.white("*")}     ${chalk.blue("*")}     ${chalk.white("*")}  
  ${chalk.white("*")}  ${chalk.cyan("❄")}     ${chalk.cyan("❄")}  ${chalk.white("*")}  
   ${chalk.white("*")}     ${chalk.blue("*")}     ${chalk.white("*")}  
      ${chalk.white("*")}     ${chalk.white("*")}    
`;

const rain =
  chalk.gray(`
      .--.      
   .-(    ).   
  (___.__)__)  
`) +
  chalk.blue(`
  ‘ ‘ ‘ ‘ ‘ ‘  
   ‘ ‘ ‘ ‘ ‘   
`);

const cloudy = `
       ${chalk.gray("      .--.      .--.")}
   ${chalk.gray("  .-(    ).  (    )-.")}
  ${chalk.gray(" (___.__)__) (___.__)__")}
`;

export const ascii = {
  sun,
  snow,
  sunBehindClouds,
  cloudy,
  rain,
};
