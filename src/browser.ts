import * as RPC from './index';

declare global {
    interface Window {
        RPC: typeof RPC;
    }
}

window.RPC = RPC;
