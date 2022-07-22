import {AppModule} from "./app.module";
import {BootstrapConsole} from 'nestjs-console'

const bootstrap = new BootstrapConsole({
    module: AppModule,
    useDecorators: true
})

bootstrap.init().then(async (app) => {
    try {

        await app.init();
        await bootstrap.boot();
        await app.close()
    } catch (e) {
        console.error(e);
        await app.close();
        process.exit(1);
    }
})