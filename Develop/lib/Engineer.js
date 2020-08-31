// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer {
    // Just like constructor functions, classes can accept arguments
    constructor(name, id, email, github) {
          this.name = name;
          this.id = id;
          this.email = email;
          this.github = github;

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
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;