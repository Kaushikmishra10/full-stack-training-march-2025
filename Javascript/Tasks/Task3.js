const userProfile = {
    id: 101,
    name: "Kaushik",
    email: "kaushikmishra@gamil.com",
    skills: ['C', 'HTML', 'CSS', 'PHP'],
    isActive: true,

    getUserInfo: function (){
    return `ID: ${this.id} Name: ${this.name} Email: ${this.email} Skills: ${this.skills.join(", ")} IsActive: ${this.isActive}`
    },

    addSkill: function(skill){
        return this.skills.push(skill);
    }, 

    deactivate: function(){
        return this.isActive = false;
    }
}

console.log(userProfile.getUserInfo());
userProfile.addSkill("Frontend");
userProfile.deactivate();
console.log(userProfile.getUserInfo());