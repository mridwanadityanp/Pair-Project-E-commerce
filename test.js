let dataUser = JSON.parse(await fs.readFile('./users.json',"utf8"))
   dataUser.forEach(user => {
      delete user.id
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users",dataUser)


     let dataProfile = JSON.parse(await fs.readFile('./profiles.json',"utf8"))
   dataProfile.forEach(profile => {
      delete profile.id
      profile.createdAt = new Date()
      profile.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Profiles",dataProfile)

    let dataProducts = JSON.parse(await fs.readFile('./products.json',"utf8"))
   dataProducts.forEach(product => {
      delete product.id
      product.createdAt = new Date()
      product.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Products",dataProducts)
  

    let dataPurchase = JSON.parse(await fs.readFile('./purchases.json',"utf8"))
   dataPurchase.forEach(purchase => {
      delete purchase.id
      purchase.createdAt = new Date()
      purchase.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Purchases",dataPurchase)