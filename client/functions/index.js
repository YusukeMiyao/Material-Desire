// const functions = require("firebase-functions");

// const { Storage } = require("@google-cloud/storage");
// const gcs = new Storage();

// const sharp = require("sharp");
// const fs = require("fs-extra");

// const os = require("os");
// const path = require("path");
// const uuid = require("uuid");

// exports.resizeImages = functions.storage.object().onFinalize(async object => {
//   try {
//     const uniqueName = uuid.v1();

//     const bucket = gcs.bucket(object.bucket);

//     const filePath = object.name;
//     const fileName = filePath.split("/").pop();
//     const bucketDir = path.dirname(filePath);

//     const workingDir = path.join(os.tmpdir(), `images_${uniqueName}`);
//     const tmpFilePath = path.join(workingDir, `source_${uniqueName}.png`);

//     if (fileName.includes("image@") || !object.contentType.includes("image")) {
//       return false;
//     }

//     await fs.ensureDir(workingDir);

//     await bucket.file(filePath).download({
//       destination: tmpFilePath
//     });

//     const sizes = [128, 256, 300, 600];
//     const uploadPromises = sizes.map(async size => {
//       const thumbName = `image@${size}_${fileName}`;
//       const thumbPath = path.join(workingDir, thumbName);

//       if (size < 300) {
//         await sharp(tmpFilePath)
//           .resize(size, size)
//           .toFile(thumbPath);
//       } else {
//         let height = Math.floor(size * 0.5625);

//         await sharp(tmpFilePath)
//           .resize(size, height)
//           .toFile(thumbPath);
//       }

//       return bucket.upload(thumbPath, {
//         destination: path.join(bucketDir, thumbName)
//       });
//     });

//     await Promise.all(uploadPromises);

//     await fs.remove(workingDir);
//     await fs.remove(bucketDir);

//     return Promise.resolve();
//   } catch (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// });
// //     ((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });


// exports.img = functions.https.onRequest((req, res) => {
    
// })


// import * as functions from "firebase-functions";
// import * as sharp from "sharp";
// import * as os from "os";
// import * as path from "path";
// import * as fileType from "file-type";
// import { storage } from "./firebaseAdmin";

// // CloudFunction fired by http event must be located us-central1.
// // ref https://firebase.google.com/docs/functions/locations#http_and_client_callable_functions
// const region = "us-central1";
// const runtimeOpts = functions.RuntimeOptions = {
//   timeoutSeconds: 300,
//   memory: "1GB",
// };
// // default width (height scales keeping aspect ratio)
// const defaultWidth = 800;

// export const onRequestResizedImage = functions
//   .runWith(runtimeOpts)
//   .region(region)
//   .https.onRequest((req, res) => {
//     const filePath = req.path.substr(1);
//     const size = req.query.size
//     let width= number | undefined;
//     let height= number | undefined;
//     if (typeof size === "undefined") {
//       width = defaultWidth;
//       height = undefined;
//     } else {
//       const [_width, _height] = size.split("x");
//       width = _width ? Number(_width) : undefined;
//       height = _height ? Number(_height) : undefined;
//     }
//     const bucket = storage.bucket(functions.config().storage.bucket);
//     const tempFilePath = path.join(os.tmpdir(), `${Math.round(Math.random() * 10000)}`);
//     bucket
//       .file(filePath)
//       .download({
//         destination: tempFilePath,
//       })
//       .then(() => {
//         sharp(tempFilePath)
//           .rotate()
//           .resize(width, height)
//           .toBuffer()
//           .then(data => {
//             const type = fileType(data);
//             res.set("Cache-Control", `public, max-age=${86400 * 365}`);
//             res.set("Content-Type", type ? type.mime : "image/jpeg");
//             res.status(200).send(data);
//           })
//           .catch((err) => res.status(500).send(err));
//       })
//       .catch((err) => {
//         res.status(500).send(err);
//       });
//   });