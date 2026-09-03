const users = [  
    {
        id: 101,
        name: "  alex JOHNSON ",
        dob: "1992-06-15",
        salary: "55000",
        skills: ["html", "css", "javascript"]
    },  
    {
        id: 102,
        name: "  maria  smith  ",
        dob: "1988-11-03",
        salary: "72000",
        skills: ["react", "node", "css"]
    },  
    {
        id: 103,
        name: "john doe",
        dob: "1996-02-25",
        salary: "48000",
        skills: ["vue", "javascript", "html"]
    }
];

// Task 1
const upcaseNames = users.map(user => {
    const cleanedName = user.name.trim().toLowerCase();
    return cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
});
console.log(upcaseNames);   // Not Giving Accurate output.

// Task 2
let uniqueSkills = [];
let jsCount = 0;

users.forEach(user => {
  user.skills.forEach(skill => {
    if (!uniqueSkills.includes(skill)) {
      uniqueSkills.push(skill);
    }
  });
  if (user.skills.includes("javascript")) {
    jsCount++;
  }

});
uniqueSkills.sort();

console.log(uniqueSkills);
console.log("Number of Peoples Who know Javascript: ", jsCount);


// Task 3
const salaries = users.map(user => Number(user.salary)).sort();
const highSal = salaries[2];
const lowSal = salaries[0];
const overAllSalary = salaries.reduce((val, sum) => sum + val, 0)
const averageSal = (overAllSalary/salaries.length).toFixed(2)
console.log("Average Salary: ", averageSal);
console.log("Height Salary: ", highSal);
console.log("Lowest Salary: ", lowSal);


//Task 4
