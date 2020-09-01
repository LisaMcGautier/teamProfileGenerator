// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

class Manager {
    // Just like constructor functions, classes can accept arguments
    constructor(name, id, email, officeNumber) {
          this.name = name;
          this.id = id;
          this.email = email;
          this.officeNumber = officeNumber;

    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}


// let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
// console.log(manager.getName());

module.exports = Manager;