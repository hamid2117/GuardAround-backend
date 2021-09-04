import multer from 'multer'
import { v1 as uuid } from 'uuid'

var mimeType = ['image/png', 'image/jpg', 'image/jpeg']
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = 'public/images/'
    cb(null, directory)
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + file.originalname)
  },
})
// const uploadTemporary = multer({ storage: multer.memoryStorage() })

const uploadImages = multer({
  storage: storage,
})

export { uploadImages }

// var imagiii = req.body.images
// console.log(imagiii)
// if (!images) images = []
// var files = []
// images.map((item) => {
//   files.push({ type: 'image', path: item.path })
// })
