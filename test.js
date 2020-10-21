const models  = require('./models')
const User = models.Register;



(async() => {
    try{
        const captains = await User.bulkCreate([
            { 
                name: "Jack Sparrow",
                phone: 978767576,
                email: 'abc@gmail.com',
                password: 'abc@1122'
             },
            { 
                name: "Davy Jones",
                phone: 778767576,
                email: 'xyz@gmail.com',
                password: 'xyz@1122'
            }
          ]);
          console.log('done')
    } catch(e) {
        console.log('>>>>>>>>>>>>>>>>>>>>>',e)
    }
})();
