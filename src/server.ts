import { env } from '@/env';
import { app } from '@/app';

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('🎈 HTTP Server running');
});
app.addHook('onError', (request, reply, error, done) => {
    console.error('Error:', error);
    done();
});