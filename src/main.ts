
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('./app.module');
const { NestFactory } = require('@nestjs/core');
const dotenv =require('dotenv');
//const express = require('express');
//const mongoose = require('mongoose');
dotenv.config();
import { json } from 'body-parser';

// const cloneBuffer = require('clone-buffer');
// import { domainToASCII } from 'url';
// import { ConfigModule } from '@nestjs/config';
const { ValidationPipe } = require('@nestjs/common');
var fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
//const bodyParser = require('body-parser');
//const path = require('path')
//const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './dotenv') })

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true ,   rawBody: true});
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

 
    admin.initializeApp({credential: admin.credential.cert(firebaseConfig)});
    // mongoose.connect(process.env.DATABASE,{
    //   useNewUrlParser: true,
    //   useUnifiedTopology:false
    // })
    // .then(()=>console.log("DB CONNECTED"))
    // .catch(err=>console.log('DB CONNECTION ERROR',err))
    

    const config = new DocumentBuilder()
      .setTitle('ecom-vegbox')
      .setDescription('ecom-vegbox application')
      .setVersion('1.0')
      .addTag('ecom-vegbox')
      //.enableCors()
      .addBearerAuth(
        {
          description: `[just text field] Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'JWT',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header'
        },
        'JWT-auth',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('ecom-vegbox/v1', app, document);
    app.use(morgan('dev'));
    app.use(bodyParser.json());
   // app.use(bodyParser.json({ limit: "2mb" }));
  app.use(bodyParser.json({ limit: '50mb' })); // Adjust '50mb' to the appropriate size you need
   app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());
    app.use(json({
      verify: (req: any, res, buf, encoding) => {
        // important to store rawBody for Stripe signature verification
        if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
          req.rawBody = buf.toString();
        }
        return true;
      },
      
    }));
  //  app.use(bodyParser.raw({type: '*/*'}))
   app.use(bodyParser.raw({ type: 'application/json' }));
    
    const factfinding = await app.listen(process.env.PORT);
    console.log('ecom-vegbox application is listening on http://localhost:' + process.env.PORT + '/ecom-vegbox/v1');
  }
  catch (e) {
    console.log('error in starting server');
    throw e;
  }

}
bootstrap();