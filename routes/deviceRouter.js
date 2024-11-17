const Router = require('express')

const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


// router.get('/',checkRole('ADMIN'), deviceController.create)

router.post('/log_reg', deviceController.log_reg)
router.post('/createBasketItem', deviceController.createBasketItem)
router.post('/createOrderItem', deviceController.createOrderItem)
router.post('/createOrder', deviceController.createOrder)
router.post('/creatCategoria', deviceController.creatCategoria)
router.post('/creatItem', deviceController.creatItem)
router.post('/getItemById', deviceController.getItemById)
router.post('/getOrder', deviceController.getOrder)
router.post('/get_five_Item', deviceController.get_five_Item)
router.post('/createIt', deviceController.createIt)

router.post('/deleteItem', deviceController.deleteItem)
router.get('/getStaff', deviceController.getStaff)



router.post('/getUser1', deviceController.getUser1)

router.post('/putChangeInfo', deviceController.putChangeInfo)

router.post('/createCategoria', deviceController.createCategoria)

router.post('/getAllItemByUserId', deviceController.getAllItemByUserId)

router.post('/delcategoria', deviceController.delcategoria)
router.post('/addTovar', deviceController.addTovar)


router.post('/deleteBasketDevice', deviceController.deleteBasketDevice)
router.post('/updateOneBasketItemPlus', deviceController.updateOneBasketItemPlus)
router.post('/updateOneBasketItemMinus', deviceController.updateOneBasketItemMinus)
router.post('/getOrderAdmin', deviceController.getOrderAdmin)

router.post('/getPrice', deviceController.getPrice)


router.post('/getItems', deviceController.getItems)
router.post('/getUser', deviceController.getUser)
router.post('/updateUser', deviceController.updateUser)
router.post('/getItem_info', deviceController.getItem_info)

router.post('/updateSmena', deviceController.updateSmena)



router.post('/sms_veryf', deviceController.sms_veryf)

router.post('/log_reg_Role', deviceController.log_reg_Role)

router.get('/getCategoriaAll', deviceController.getCategoriaAll)

router.get('/getCategoria', deviceController.getCategoria)
// router.get('/getVideo', deviceController.getVideo)
// router.post('/createVideo', deviceController.createVideo)
// router.post('/createUser', deviceController.registration_0)
// router.post('/login', deviceController.login)

// router.post('/createSessia', deviceController.createSessia)
// router.post('/createPortfolio', deviceController.createPortfolio)
// router.post('/createPortfolioImg', deviceController.createPortfolioImg)
// router.post('/createSessiaTags', deviceController.createSessiaTags)


// router.get('/getSessia/:id', deviceController.getSessia)
// router.get('/getUser/:id', deviceController.getUser)
// router.post('/login', deviceController.login)

module.exports = router