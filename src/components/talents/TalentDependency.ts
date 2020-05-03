export enum TalentDepType {
    left = "left",
    up = "up",
    right = "right",
    down = "down"
}
export type TalentDependency = Record<string, number>;
export const TalentDependencyIndex: Record<TalentDepType, (index: number, cols: number) => [number, number]> = {
    [TalentDepType.left]: (index: number, cols: number) => [index - 1, 0],
    [TalentDepType.up]: (index: number, cols: number) => [index + cols, 1],
    [TalentDepType.right]: (index: number, cols: number) => [index + 1, 0],
    [TalentDepType.down]: (index: number, cols: number) => [index - cols, 1],
}