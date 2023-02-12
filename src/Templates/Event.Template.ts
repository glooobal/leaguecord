import { Event } from '../Types';

const event: Event = {
    name: 'ready',
    // once: true,
    execute: () => {
        console.log('Example event.');
    },
};

export default event;
