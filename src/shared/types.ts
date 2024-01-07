type ActionToActionObjMap<ReducerActions> = {
    [K in keyof ReducerActions]: ReducerActions[K] extends (...args: any[]) => infer R ? R : never;
}

export type AllReducerActions<ReducerActions> = ActionToActionObjMap<ReducerActions>[keyof ReducerActions];