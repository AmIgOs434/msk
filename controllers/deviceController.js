const uuid = require('uuid')
const path = require('path');
const { Basket_Item, Order_item, Order, Item, Categoria, User } = require('../models/models')
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken')
const { Op, Sequelize } = require('sequelize');


const generateJwt = (id) => {
  return jwt.sign(
      {id},
      process.env.SECRET_KEY,
      {expiresIn: "24h"}
  )
}
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
     
  host: 'smtp.mail.ru',
  port:465,
  secure : true,
  auth: {
      user: 'nso-sms@mail.ru',
      pass: 'qgEwTnVAGA1bi0WFYhj3'
  }
});



const sendSMS = async(mail,sms) => {
  await transporter.sendMail({
    from: 'nso-sms@mail.ru',
    to: mail,
    subject : "МСК-lounge подтвердите вашу почту",
    html: `<div>Ваш пароль : ${sms}</div> `,

  })
}


class deviceController {


//   async registration_0(req, res, next) {
//     const {email} = req.body
//     const user_0 = await User.create({email})

//     const token = generateJwt(user_0.id)
//     return res.json({token})
// }


async sms_veryf(req, res, next) {
  try {
    const {mail,sms} = req.body
    const sms1 = await sendSMS(mail,sms)
     return res.json(sms1)
  } catch (error) {
      console.error(error); // Логируем ошибку
      return res.status(500).json({ message: 'Internal server error' });
  }


}
async log_regq(req, res, next) {

      const {phone} = req.body
      const user_0 = await User.findOrCreate({
      where: { phone: phone }
      })
      const id = user_0[0].dataValues.id
      const token = generateJwt(user_0.id)
      console.log(user_0[0].dataValues.id)
      return res.json(id)
  }
  async log_reg(req, res, next) {
    try {
        const  {phone} = req.body

        // Находим или создаем пользователя
        const [user, created] = await User.findOrCreate({
            where: { phone: phone }
        });

        // Получаем id пользователя
        const id = user.dataValues.id;
        // Генерируем токен
        const token = generateJwt(id); // Используем id для генерации токена
        console.log(id); // Логируем id пользователя
        // Возвращаем id и токен
        return res.json(id);
        
    } catch (error) {
        console.error(error); // Логируем ошибку
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async addTovar(req, res, next) {
  try {
      let {
name,
opisaniye,
price,
photo,
categoriaId
       } = req.body
      const device = await Item.create({
        name:name,
        opisaniye:opisaniye,
        price:price,
        img:photo,
        CategoriumId:categoriaId
      })
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

  async log_reg_Role(req, res, next) {

    const {phone,role,photo} = req.body
    const user_0 = await User.findOrCreate({
    where: { phone: phone }
    })
    const id = user_0[0].dataValues.id
    
    const basket =  await User.update(
      { 
        Role:'staff',
        time: role,
        photo: photo,
        type_dost: 1,
          
      },
      {
          where: {id:id} 
      }
      
      )
    
      if (basket) {
          return res.status(206).send('Basket updated successfully ');
        }throw new Error('Product not found');
      } catch (error) {
        return res.status(500).send(error.message);
    }
// async login(req, res, next) { 
//   const {email} = req.body
//   const user = await User.findOne({where: {email:email}})

//   if (user===null) {
//     return res.json('Пользователь не найден')
//   }

//   // let comparePassword = password==user.Пароль
//   // if (!comparePassword) {
//   //     return   res.json('Указан неверный пароль')
//   // }

//   const token = generateJwt(user.id)
//   return res.json({token})
// }


//   async getUser(req, res) {
//     const {id} = req.params
//     const user = await User.findOne(
//         {
//             where: {id:id},
//             include: [{model: Sessia, as: 'Sessia'}],

//         },
//     )
//     return res.json(user)
// }

// async getSessia(req, res) {
//   const {id} = req.params
//   const user = await Sessia.findOne(

//       {
//           where: {id:id},
//           include: [{model: Portfolio, as: 'Portfolio' ,include: [{model: Portfolios_img, as: 'Portfolios_img'}] },{model: Video, as: 'Video'}]
//       }
//   )
//   return res.json(user)
// }

// async getVideo(req, res) {
//   const video = await Video.findAll({
//     limit: 5,
//     where: {
//       id: {
//         [Op.not]: [5,4]
//       }
//     }

//   });
//   return res.json(video)
// }



// async createUser(req, res, next) {
//   try {
//       let { author, authorLink,SessiumId,name,sessiaImg,tags,tema} = req.body
//       const prosmotri = 0
//       const dostup = 0
//       const {video} = req.files
//       let fileName = uuid.v4() + ".mp4"
//       video.mv(path.resolve(__dirname, '..', 'static', fileName))
     
//       const device = await Video.create({prosmotri, author, authorLink, videoURL: fileName,SessiumId,name,sessiaImg,tags,tema,dostup});
//       return res.json(device)
//   } catch (e) {
//       next(ApiError.badRequest(e.message))
//   }
// }


async createBasketItem(req, res, next) {
  try {
      let {       
          opisaniye,
        number,
        img,
        price,
        all_price,
        name,
        comment,
        UserId,
        ItemsId} = req.body
      const device = await Basket_Item.create({
        opisaniye,
        number,
        img,
        price,
        all_price,
        name,
        comment,
        UserId,
        ItemsId
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}



async createCategoria(req, res, next) {
  try {
      let {
name
       } = req.body
      const device = await Categoria.create({
        name
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}




async createOrderItem(req, res, next) {
  try {
      let {
opisaniye,
number,
img,
price,
all_price,
name,
comment,
OrderId
       } = req.body
      const device = await Order_item.create({

        opisaniye,
number,
img,
price,
all_price,
name,
comment,
OrderId
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}


async createOrder(req, res, next) {
  try {
      let {
        name,
price,
date,
status,
all_price,
comment,
UserId,
type_dost,
adress,
time
       } = req.body
      const device = await Order.create({
        name,
price,
date,
status,
all_price,
comment,
UserId,
type_dost,
adress,
time
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

async creatCategoria(req, res, next) {
  try {
      let {name } = req.body
      const device = await Categoria.create({name});
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

async creatItem(req, res, next) {
  try {
      let { 
        name,
opisaniye,
kkal,
belki,
ziri,
uglevodi,
ves,
price,
img,
CategoriumId
      } = req.body
      const device = await Item.create({
        name,
opisaniye,
kkal,
belki,
ziri,
uglevodi,
ves,
price,
img,
CategoriumId
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
async getCategoria(req, res, next) {
  try {

      const device = await Categoria.findAll({

        include: [{model: Item, as: 'Item'}],
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['id', 'ASC'],

        ]
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

async getItems(req, res, next) {
  const {id} = req.body
  const device = await Item.findAll({
    where:{ CategoriumId:id},
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['id', 'ASC'],
    ]
  });
  return res.json(device)
} catch (e) {
  next(ApiError.badRequest(e.message))

}
async getCategoriaAll(req, res, next) {
  try {
      const device = await Categoria.findAll({
      

        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['id', 'ASC'],

        ]
      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

async getPrice(req, res, next) {
  try {
     const {id} = req.body
      const device = await Basket_Item.findAll({
        where:{ UserId:id},
      });
      let price = 0
      if (device[0]?.dataValues){
        device.map(i=>price = price + i.dataValues.price*i.dataValues.number)
        console.log(price)
      }
      return res.json(price)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
async getOrder(req, res, next) {
  try {
     const {id} = req.body
      const device = await Order.findAll({
        where:{ UserId:id},
        include: [{model: Order_item, as: 'Order_item'}],

      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
async getOrderAdmin(req, res, next) {
  try {
      const device = await Order.findAll({
        include: [{model: Order_item, as: 'Order_item'}],

      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
 
async get_five_Item(req, res, next) {
  try {
  
      const device = await Item.findAll({ order: Sequelize.literal('random()'), limit: 5 }).then((encounters) => {
        return res.json(encounters)
      });
    
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}

async getItemById(req, res, next) {
  try {
    let {UserId,ItemsId} = req.body
      const device = await Basket_Item.findOne({

        where: {
          UserId:UserId,
          ItemsId:ItemsId,
        }

      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
async getAllItemByUserId(req, res, next) {
  try {
    let {UserId,ItemsId} = req.body
      const device = await Basket_Item.findAll({

        where: {
          UserId:UserId,
        }

      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}


async getStaff(req, res, next) {
  try {
      const device = await User.findAll({

        where: {
          Role:'staff',
        }

      });
      return res.json(device)
  } catch (e) {
      next(ApiError.badRequest(e.message))
  }
}
async updateOneBasketItemPlus (req, res) {
  const {id} =  req.body
  const basket1 = await Basket_Item.findOne(
    {
      where: {id:id} 
  }
  )
  const basket2 = parseInt(basket1.dataValues.number)
  
  const basket =  await Basket_Item.update(
  {
    number: basket2+1,
      
  },
  {
      where: {id:id} 
  }
  
  )

  if (basket) {
      return res.status(206).send('Basket updated successfully ');
    }throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
}
async putChangeInfo(req, res) {
  try {
    const { itemId, kateg, info } = req.body;

    // Проверка на наличие itemId
    if (!itemId) {
      return res.status(400).send('Item ID is required');
    }

    // Сопоставление категорий с полями базы данных
    const updateFields = {
      'Описание': 'opisaniye',
      'Название': 'name',
      'Цена': 'price',
      'Фото': 'img',
      'Стоп': 'status',
      'Наличие': 'status'
    };

    // Проверка, существует ли категория
    if (!updateFields[kateg]) {
      return res.status(400).send('Invalid category');
    }

    // Подготовка объекта обновления
    const updateData = {};

    // Устанавливаем статус в зависимости от категории
    if (kateg === 'Стоп') {
      updateData[updateFields[kateg]] = 2; // Устанавливаем статус 2 для 'Стоп'
    } else if (kateg === 'Наличие') {
      updateData[updateFields[kateg]] = 1; // Устанавливаем статус 1 для 'Наличие'
    } else {
      updateData[updateFields[kateg]] = info; // Устанавливаем другие поля
    }

    // Обновление записи в базе данных
    const basket = await Item.update(updateData, {
      where: { id: itemId }
    });

    // Проверка, было ли обновление успешным
    if (basket[0] === 0) {
      return res.status(404).send('Product not found');
    }

    return res.status(206).send('Basket updated successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



async getItem_info (req, res) {
  const {id} =  req.body
 
  
  const device = await Item.findOne({

    where: {
      id:id
    }

  });
  return res.json(device)
} catch (e) {
  next(ApiError.badRequest(e.message))
}


async updateSmena (req, res) {
  const {id,znach} =  req.body
 
  
  const basket =  await User.update(
  {
    adress: znach,
  },
  {
      where: {id:id} 
  }
  
  )

  if (basket) {
      return res.status(206).send('Basket updated successfully ');
    }throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
}
async updateUser (req, res) {
  const {id,name,phone,birthday,email} =  req.body
 
  
  const basket =  await User.update(
  {
    name: name,
    phone:phone,
    birthday: birthday,
    email: email,
  },
  {
      where: {id:id} 
  }
  
  )

  if (basket) {
      return res.status(206).send('Basket updated successfully ');
    }throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
}
async getUser (req, res) {
  const {id} =  req.body
 
  
  const device = await User.findOne({

    where: {
      id:id
    }

  });
  console.log(device.dataValues.Role)
  return res.json(device.dataValues.Role)
} catch (e) {
  next(ApiError.badRequest(e.message))
}
async getUser1 (req, res) {
  const {id} =  req.body
 
  
  const device = await User.findOne({

    where: {
      id:id
    }

  });
  return res.json(device)
} catch (e) {
  next(ApiError.badRequest(e.message))
}
async updateOneBasketItemMinus (req, res) {
  const {id} =  req.body
  const basket1 = await Basket_Item.findOne(
    {
      where: {id:id} 
  }
  )
  const basket2 = parseInt(basket1.dataValues.number)
  
  const basket =  await Basket_Item.update(
  {
    number: basket2-1,
      
  },
  {
      where: {id:id} 
  }
  
  )

  if (basket) {
      return res.status(206).send('Basket updated successfully ');
    }throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
}
async deleteBasketDevice (req, res) {
  try {
    const { id } = req.body;
    const deletedProduct1 = await Basket_Item.destroy({
      where: { id: id },
    });


    if (deletedProduct1) {
      return res.status(204).send('Product deleted successfully ');
    }

    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

async delcategoria (req, res) {
  try {
    const { id } = req.body;
    const deletedProduct1 = await Categoria.destroy({
      where: { id: id },
    });
    if (deletedProduct1) {
      return res.status(204).send('Product deleted successfully ');
    }
    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

async deleteItem (req, res) {
  try {
    const { id } = req.body;
    const deletedProduct1 = await Item.destroy({
      where: { id: id },
    });
    const deletedProduct2 = await Basket_Item.destroy({
      where: { ItemsId: id },
    });

    if (deletedProduct1) {
      return res.status(204).send('Product deleted successfully ');
    }
    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


async createIt (req, res) {
  try {
    
    const { name,opisaniye,CategoriumId,price } = req.body;
    const {img} = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'static', fileName))

    const images = `https://nso-construct.ru:8443/${fileName}`


    const deletedProduct1 = await Item.create({
      name:name,
      opisaniye:opisaniye,
      CategoriumId:CategoriumId,
      img:images,
      price:price
    });


    if (deletedProduct1) {
      return res.status(204).send('Product deleted successfully ');
    }
    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//   async createSessia(req, res, next) {
//     const {name,kto,professia_name,osebe,opit,zarplata,UserId,tags} = req.body
//     const sessia = await Sessia.create({name,kto,professia_name,osebe,opit,zarplata,UserId,tags})
//     return res.json({sessia})
// }

// async createSessiaTags(req, res, next) {
//   const {name,SessiumId} = req.body
//   const sessia = await SessiaTags.create({name,SessiumId})
//   return res.json({sessia})
// }


// async createPortfolio(req, res, next) {
//   const {name,opisaniye_kratko,opisaniye_full,SessiumId} = req.body
//   const Portfolio1 = await Portfolio.create({name,opisaniye_kratko,opisaniye_full,SessiumId})
//   return res.json({Portfolio1})
// }

// // async create(i) {
// //   const fileName = uuid.v4() + ".mp4"
// //   i.mv(path.resolve(__dirname, '..', 'static', fileName))
// //   await Portfolios_img.create({fileName,id})
// // }
// async createPortfolioImg(req, res, next) {
//   // const {img,PortfolioId} = 
//   // const PortfolioImg = await Portfolio.create({img,PortfolioId})
//   const create = async (i) => { 
//     const fileName = uuid.v4() + ".mp4"
//     i.mv(path.resolve(__dirname, '..', 'static', fileName))
//     await Portfolios_img.create({img:fileName,PortfolioId:id})
//   }
//   const {img} = req.files
//   const {id} = req.body
// img.map(i => 
//   create(i)
//   )
//   // let fileName = uuid.v4() + ".mp4"
//   // video.mv(path.resolve(__dirname, '..', 'static', fileName))


//   return res.json('2')
// }

}

module.exports = new deviceController()