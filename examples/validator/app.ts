import validator from "https://dev.jspm.io/class-validator@0.8.5";
import transformer from "https://dev.jspm.io/class-transformer@0.2.3";
import { App, Area, Controller, Post, Body } from '../../src/mod.ts';
import { PostModel } from './models/post.ts';

const { validate } = validator;
const { plainToClass } = transformer;

// Create controller
@Controller()
export class HomeController {

    @Post('/')
    async post(@Body(PostModel) data: PostModel) {

        return {
            data,
            errors: await validate(data)
        }
    }
}

// Declare controller in area
@Area({
    controllers: [HomeController],
})
export class HomeArea { }

// Create app
const app = new App({
    areas: [HomeArea],
});

// added tranform function
app.useTransform({
    type: 'body', // parse body params
    getTransform: (transform: any, body: any) => {
        return plainToClass(transform, body);
    }
})

app.listen();
