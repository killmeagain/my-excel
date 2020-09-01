import './scss/index.scss';

async function start() {
    await Promise.resolve('async working');
}

start().then(() => console.log('hello'));
