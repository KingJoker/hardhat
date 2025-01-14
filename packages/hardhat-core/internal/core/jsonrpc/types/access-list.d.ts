/// <reference types="node" />
import * as t from "io-ts";
declare const rpcAccessListTuple: t.TypeC<{
    address: t.Type<Buffer, Buffer, unknown>;
    storageKeys: t.Type<Buffer[] | null, Buffer[] | null, unknown>;
}>;
export declare const rpcAccessList: t.ArrayC<t.TypeC<{
    address: t.Type<Buffer, Buffer, unknown>;
    storageKeys: t.Type<Buffer[] | null, Buffer[] | null, unknown>;
}>>;
export declare type RpcAccessListTuple = t.TypeOf<typeof rpcAccessListTuple>;
export declare type RpcAccessList = t.TypeOf<typeof rpcAccessList>;
export {};
//# sourceMappingURL=access-list.d.ts.map